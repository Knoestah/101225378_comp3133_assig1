const UserModel = require("./models/users")
const ListingModel = require("./models/listings")
const BookingModel = require("./models/bookings")
const jwt = require("jsonwebtoken");

exports.resolvers = {
    Query: {
        me: async (parent, args, { user, sub }) => {
            return await UserModel.findById(sub);
        },
        getBookingsByLoggedInUser: async (parent, args, { user }) => {
            return await BookingModel.find({ username: user.username })
        },
        getListingsByLoggedInAdmin: async (parent, args, { user }) => {
            return await ListingModel.find({ username: user.username })
        },
        getListingsByAdmin: async (parent, args) => {
            return await ListingModel.find({ username: args.username })
        },        
        getListingsByName: async (parent, args) => {
            return await ListingModel.find({ title: { $regex: ".*" + args.title + ".*" } })
        },
        getListingsByCity: async (parent, args) => {
            return await ListingModel.find({ city: args.city });
        },
    },
    Mutation: {
        createUser: async (parent, args) => {
            let newUser = await UserModel({ ...args })
            return newUser.save();
        },
        login: async (parent, args) => {
            let user = await UserModel.findOne({ username: args.username, password: args.password })
            return await jwt.sign({ user }, "SUPER_SECRET", { algorithm: "HS256", subject: user._id.toString(), expiresIn: "7d" })
        },
        
        createBooking: async (parent, args, { user }) => {
            if (!user) {
                return null;
            }

            let newBooking = await BookingModel({
                listing_id: args.listing_id,
                booking_date: args.booking_date,
                booking_start: args.booking_start,
                booking_end: args.booking_end,
                username: user.username,
            });
            return newBooking.save()
        },
        createListing: async (parent, args, { user }) => {
            if (!user) {
                return null;
            }

            let newListing = await ListingModel({
                title: args.title,
                description: args.description,
                street: args.street,
                city: args.city,
                postal_code: args.postal_code,
                price: args.price,
                email: args.email,
                username: user.username,
            });
            return newListing.save()
        },
    },
};