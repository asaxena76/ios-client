import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString
} from "graphql";

var userType = new GraphQLObjectType({
    name: "User",
    description: "A user of Effektif",
    fields: () => {
        id: {
            type: new GraphQLNonNull(GraphQLString),
            description: "The id of a user"
        },
        firstName: {
            type: GraphQLString,
            description: "The last name of the user"
        },
        lastName: {
            type: GraphQLString,
            description: "The last name of the user"
        },
        color: {
            type: GraphQLString,
            description: "The color in which to show the avatar"
        }
    }
});
