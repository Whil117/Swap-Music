/* eslint-disable no-console */
const Artist = require('../models/artist')

const resolvers = {
  Query: {
    // products
    listArtist: async (_: any, { filter }: { filter: object }) => {
      const artists = await Artist.find({ ...filter })
      return artists
    },
    artistById: async (
      _: any,
      {
        id,
      }: {
        id: string
      }
    ) => {
      const artist = await Artist.findOne({ id: id })
      if (artist) {
        return artist
      } else {
        throw new Error('Artist not found')
      }
    },
  },

  Mutation: {
    createArtist: async (_: any, { input }: any) => {
      const artist = new Artist(input)
      const result = await artist.save()
      return result
    },
  },
}

export default resolvers
