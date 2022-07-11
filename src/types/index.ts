/* eslint-disable no-unused-vars */
import { OperationVariables, QueryResult } from '@apollo/client'
import { GraphQLResolveInfo } from 'graphql'
import { NextComponentType, NextPage, NextPageContext } from 'next'
import { AppInitialProps } from 'next/app'
import { Router } from 'next/router'
import { ReactNode } from 'react'

export type Layout = (page: ReactNode) => ReactNode

export type NextPageFC<L = any, P = any, IP = P> = NextPage<P, IP> & L
export type QueryTypeChildren = { children: ReactNode }
export type QueryType = QueryResult<
  IQueryFilter<'listArtist'>,
  OperationVariables
>
export type QueryTypeNode = {
  query: QueryType
  role?: string | string[]
}

export type AppPropsWithLayout<L = any, P = any> = AppInitialProps & {
  Component: NextComponentType<NextPageContext, any, P> & L
  router: Router
  __N_SSG?: boolean | undefined
  __N_SSP?: boolean | undefined
}

export type IQueryFilter<T extends keyof IQuery> = Pick<IQuery, T>
export type IMutationFilter<T extends keyof IMutation> = Pick<IMutation, T>

export type IGraphQLResponseRoot = {
  data?: IQuery | IMutation
  errors?: Array<IGraphQLResponseError>
}

interface IGraphQLResponseError {
  message: string
  locations?: Array<IGraphQLResponseErrorLocation>
  [propName: string]: any
}

interface IGraphQLResponseErrorLocation {
  line: number
  column: number
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

export interface IQuery {
  listArtist?: Array<IArtist | null>
  artistById?: IArtist
}

export interface IArtist {
  id?: string
  name?: string
  description?: string
  images?: Array<IImage | null>
  uri?: string
  popularity?: number
  type?: string
  followers?: number
  genres?: Array<string | null>
  href?: string
  backgroundCover?: string
  customize?: ICustomize
  biography?: string
}

export interface IImage {
  url?: string
  height?: number
  width?: number
}

export interface ICustomize {
  colors?: IColors
}

export interface IColors {
  font?: string
  primary?: string
  background?: string
}

export interface IMutation {
  createArtist?: IArtist
}

export interface IArtistInput {
  id: string
  name: string
  description?: string
  images?: Array<IImageInput | null>
  uri: string
  popularity?: number
  type: string
  followers?: number
  genres?: Array<string | null>
  href?: string
  backgroundCover?: string
  customize?: ICustomizeInput
  biography?: string
}

export interface IImageInput {
  url?: string
  height?: number
  width?: number
}

export interface ICustomizeInput {
  colors?: IColorsInput
}

export interface IColorsInput {
  font?: string
  primary?: string
  background?: string
}

/*********************************
 *                               *
 *         TYPE RESOLVERS        *
 *                               *
 *********************************/
/**
 * This interface define the shape of your resolver
 * Note that this type is designed to be compatible with graphql-tools resolvers
 * However, you can still use other generated interfaces to make your resolver type-safed
 */
export interface IResolver {
  Query?: IQueryTypeResolver
  Artist?: IArtistTypeResolver
  Image?: IImageTypeResolver
  Customize?: ICustomizeTypeResolver
  Colors?: IColorsTypeResolver
  Mutation?: IMutationTypeResolver
}
export interface IQueryTypeResolver<TParent = any> {
  listArtist?: QueryToListArtistResolver<TParent>
  artistById?: QueryToArtistByIdResolver<TParent>
}

export interface QueryToListArtistResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult
}

export interface QueryToArtistByIdArgs {
  id: string
}
export interface QueryToArtistByIdResolver<TParent = any, TResult = any> {
  (
    parent: TParent,
    args: QueryToArtistByIdArgs,
    context: any,
    info: GraphQLResolveInfo
  ): TResult
}

export interface IArtistTypeResolver<TParent = any> {
  id?: ArtistToIdResolver<TParent>
  name?: ArtistToNameResolver<TParent>
  description?: ArtistToDescriptionResolver<TParent>
  images?: ArtistToImagesResolver<TParent>
  uri?: ArtistToUriResolver<TParent>
  popularity?: ArtistToPopularityResolver<TParent>
  type?: ArtistToTypeResolver<TParent>
  followers?: ArtistToFollowersResolver<TParent>
  genres?: ArtistToGenresResolver<TParent>
  href?: ArtistToHrefResolver<TParent>
  backgroundCover?: ArtistToBackgroundCoverResolver<TParent>
  customize?: ArtistToCustomizeResolver<TParent>
  biography?: ArtistToBiographyResolver<TParent>
}

export interface ArtistToIdResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult
}

export interface ArtistToNameResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult
}

export interface ArtistToDescriptionResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult
}

export interface ArtistToImagesResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult
}

export interface ArtistToUriResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult
}

export interface ArtistToPopularityResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult
}

export interface ArtistToTypeResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult
}

export interface ArtistToFollowersResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult
}

export interface ArtistToGenresResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult
}

export interface ArtistToHrefResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult
}

export interface ArtistToBackgroundCoverResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult
}

export interface ArtistToCustomizeResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult
}

export interface ArtistToBiographyResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult
}

export interface IImageTypeResolver<TParent = any> {
  url?: ImageToUrlResolver<TParent>
  height?: ImageToHeightResolver<TParent>
  width?: ImageToWidthResolver<TParent>
}

export interface ImageToUrlResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult
}

export interface ImageToHeightResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult
}

export interface ImageToWidthResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult
}

export interface ICustomizeTypeResolver<TParent = any> {
  colors?: CustomizeToColorsResolver<TParent>
}

export interface CustomizeToColorsResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult
}

export interface IColorsTypeResolver<TParent = any> {
  font?: ColorsToFontResolver<TParent>
  primary?: ColorsToPrimaryResolver<TParent>
  background?: ColorsToBackgroundResolver<TParent>
}

export interface ColorsToFontResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult
}

export interface ColorsToPrimaryResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult
}

export interface ColorsToBackgroundResolver<TParent = any, TResult = any> {
  (parent: TParent, args: {}, context: any, info: GraphQLResolveInfo): TResult
}

export interface IMutationTypeResolver<TParent = any> {
  createArtist?: MutationToCreateArtistResolver<TParent>
}

export interface MutationToCreateArtistArgs {
  input?: IArtistInput
}
export interface MutationToCreateArtistResolver<TParent = any, TResult = any> {
  (
    parent: TParent,
    args: MutationToCreateArtistArgs,
    context: any,
    info: GraphQLResolveInfo
  ): TResult
}
