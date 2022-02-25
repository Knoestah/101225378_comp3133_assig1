const { gql } = require("apollo-server-express");

exports.typeDefs = gql`
    enum UserRole {
        USER
        ADMIN
    }
    type User {
        id: ID!
        username: String!
        firstname: String!
        lastname: String!
        email: String!
        password: String!
        type: UserRole
    }
    type Listing { 
        id: ID!       
        title: String!
        description: String!
        street: String!
        city: String!
        postal_code: String!
        price: Float!
        email: String!
        username: String!
    }
    type Booking {
        listing_id: ID!
        booking_date: String!
        booking_start: String!
        booking_end: String!
        username: String!
    }
    type Query {
        me: User!
        getBookingsByLoggedInUser: [Booking]
        getListingsByAdmin(username: String!): [Listing]
        getListingsByLoggedInAdmin: [Listing]
        getListingsByName(title: String!): [Listing]
        getListingsByCity(city: String!): [Listing]
    }
    type Mutation {
        createUser(username: String!, firstname: String!, lastname: String!, email: String!, password: String!, type: UserRole!): User
        login(username: String!, password: String!): String
        createListing(title: String!, description: String!, street: String!, city: String!, postal_code: String!, price: Float!, email: String!, username: String!): Listing
        createBooking(listing_id: ID!, booking_date: String!, booking_start: String!, booking_end: String!): Booking
    }
`