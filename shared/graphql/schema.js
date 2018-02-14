const {
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLFloat
  } = require('graphql');

  const { getTimeline } = require('../../server/services/instagram/api');

  const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Instagram User',
    fields: () => ({
      full_name: { type: GraphQLString },
      id: { type: GraphQLString },
      profile_picture: { type: GraphQLString },
      username: { type: GraphQLString },
    }),
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
    name: 'MediaList',
    description: 'List of Media',
    fields: () => ({
      data: { type: GraphQLList(MediaType) }
    })
  });
  
  const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Query Root',
    fields: () => ({
      media: {
        type: MediaTypeList,
        args: {
          token: { type: GraphQLString }
        },
        resolve: async (root, args) => await getTimeline(args.token)
      },
    }),
  });


module.exports = QueryType;