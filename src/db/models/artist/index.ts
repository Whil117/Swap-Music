import mongoose, { Document, Schema } from 'mongoose'

export interface Artist extends Document {
  id: string
  name: string
  description: string
  image: {
    url: string
    height: number
    width: number
  }
  uri: string
  popularity: number
  type: 'artist'
  followers?: number
  genres: string[]
  href: string
}

const Artist: Schema = new Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  images: [
    {
      url: String,
      height: Number,
      width: Number,
    },
  ],
  uri: {
    type: String,
    required: true,
  },
  popularity: {
    type: Number,
  },
  type: {
    type: String,
    required: true,
  },
  followers: {
    type: Number,
  },
  genres: {
    type: [String],
  },

  href: {
    type: String,
  },
  backgroundCover: {
    type: String,
  },
  customize: {
    colors: {
      primary: {
        type: String,
      },
      font: {
        type: String,
      },
      background: {
        type: String,
      },
    },
  },
  biography: {
    type: String,
  },
})

module.exports =
  mongoose.models.Artist || mongoose.model<Artist>('Artist', Artist)
