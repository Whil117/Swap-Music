/* eslint-disable no-console */
const Artist = require('../models/artist')

const resolvers = {
  Query: {
    // products
    listArtist: async (_, { filter }) => {
      const artists = await Artist.find({ ...filter })
      return artists
    },
  },

  Mutation: {
    createArtist: async (_, { input }) => {
      const artist = new Artist(input)
      const result = await artist.save()
      return result
    },
  },
}

export default resolvers
