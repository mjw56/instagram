const {
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLFloat
  } = require('graphql');

  const { users: { self, mediaRecent }} = require('../../server/services/instagram/api');

  const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Instagram User',
    fields: () => ({
      full_name: { type: GraphQLString },
      id: { type: GraphQLString },
      profile_picture: { type: GraphQLString },
      username: { type: GraphQLString },
    })
  });

  const FullUserType = new GraphQLObjectType({
    name: 'FullUserType',
    description: 'Full Instagram User',
    fields: () => ({
      id: { type: GraphQLString },
      username: { type: GraphQLString },
      full_name: { type: GraphQLString },
      profile_picture: { type: GraphQLString },
      bio: { type: GraphQLString },
      website: { type: GraphQLString },
      is_business: { type: GraphQLBoolean },
      counts: { type: CountsType }
    })
  });

  const CountsType = new GraphQLObjectType({
    name: 'Counts',
    description: 'User Counts',
    fields: () => ({
      media: { type: GraphQLInt },
      follows: { type: GraphQLInt },
      followed_by: { type: GraphQLInt }
    })
  });

  const ImageType = new GraphQLObjectType({
    name: 'Image',
    description: 'Instagram Image',
    fields: () => ({
      width: { type: GraphQLInt },
      height: { type: GraphQLInt },
      url: { type: GraphQLString }
    })
  });

  const ImagesType = new GraphQLObjectType({
    name: 'Images',
    description: 'Instragram Images',
    fields: () => ({
      thumbnail: { type: ImageType },
      low_resolution: { type: ImageType },
      standard_resolution: { type: ImageType }
    })
  });

  const CaptionType = new GraphQLObjectType({
    name: 'Caption',
    description: 'Media Caption',
    fields: () => ({
      id: { type: GraphQLString },
      text: { type: GraphQLString },
      created_time: { type: GraphQLString },
      from: { type: UserType }
    })
  });

  const LikesType = new GraphQLObjectType({
    name: 'Likes',
    description: 'Media Likes',
    fields: () => ({
      count: { type: GraphQLInt }
    })
  });

  const CommentsType = new GraphQLObjectType({
    name: 'Comments',
    description: 'Media Comments',
    fields: () => ({
      count: { type: GraphQLInt }
    })
  });

  const LocationType = new GraphQLObjectType({
    name: 'Location',
    description: 'Media Location',
    fields: () => ({
      latitude: { type: GraphQLFloat },
      longitude: { type: GraphQLFloat },
      name: { type: GraphQLString },
      id: { type: GraphQLString }
    })
  });

  const MediaType = new GraphQLObjectType({
    name: 'Media',
    description: 'Instagram Media',
    fields: () => ({
      id: { type: GraphQLString },
      user: { type: UserType },
      images: { type: ImagesType },
      created_time: { type: GraphQLString },
      caption: { type: CaptionType },
      user_has_liked: { type: GraphQLBoolean },
      likes: { type: LikesType },
      tags: { type: GraphQLList(GraphQLString) },
      filter: { type: GraphQLString },
      comments: { type: CommentsType },
      type: { type: GraphQLString },
      link: { type: GraphQLString },
      location: { type: LocationType },
      attribution: { type: GraphQLString },
      users_in_photo: { type: GraphQLList(UserType) }
    })
  });

  const MediaTypeList = new GraphQLObjectType({
    name: 'MediaTypeList',
    description: 'List of Media',
    fields: () => ({
      data: { type: GraphQLList(MediaType) }
    })
  });

  const UsersEndpoint = new GraphQLObjectType({
    name: 'UsersEndpoint',
    description: 'Instagram Users Endpoint',
    fields: () => ({
      self: {
        type: FullUserType,
        args: {
          token: { type: GraphQLString }
        },
        resolve: async (root, args) => await self(args.token)
      },
      media: {
        type: MediaTypeList,
        args: {
          token: { type: GraphQLString }
        },
        resolve: async (root, args) => await mediaRecent(args.token)
      },
    })
  })

  const RootType = new GraphQLObjectType({
    name: 'RootType',
    description: 'Instagram GraphQL API Root',   
    fields: () => ({
      users: { 
        type: UsersEndpoint,
        resolve(source, params, root, ast) {
          return true;
        }
      }
      // TODO
      /*
      users
      relationships
      media
      comments
      likes
      tags
      locations
      */
    }),
  });
  
  const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Query Root',
    fields: {
      root: { 
        type: RootType,
        resolve(source, params, root, ast) {
          return true;
        }
      },
    },
  });

module.exports = QueryType;