// Code generated by prismic-ts-codegen. DO NOT EDIT.

import type * as prismicT from "@prismicio/types";
import type * as prismic from "@prismicio/client";

type Simplify<T> = {
    [KeyType in keyof T]: T[KeyType];
};
/** Content for Menu documents */
export interface MenuDocumentData {
    /**
     * Links field in *Menu*
     *
     * - **Field Type**: Group
     * - **Placeholder**: *None*
     * - **API ID Path**: menu.links[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/group
     *
     */
    links: prismicT.GroupField<Simplify<MenuDocumentDataLinksItem>>;
}
/**
 * Item in Menu → Links
 *
 */
export interface MenuDocumentDataLinksItem {
    /**
     * Label field in *Menu → Links*
     *
     * - **Field Type**: Text
     * - **Placeholder**: Label du lien
     * - **API ID Path**: menu.links[].label
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    label: prismicT.KeyTextField;
    /**
     * Link field in *Menu → Links*
     *
     * - **Field Type**: Link
     * - **Placeholder**: Lien
     * - **API ID Path**: menu.links[].link
     * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
     *
     */
    link: prismicT.LinkField;
}
/**
 * Menu document from Prismic
 *
 * - **API ID**: `menu`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type MenuDocument<Lang extends string = string> = prismicT.PrismicDocumentWithoutUID<Simplify<MenuDocumentData>, "menu", Lang>;
/** Content for Page documents */
export interface PageDocumentData {
    /**
     * Title field in *Page*
     *
     * - **Field Type**: Title
     * - **Placeholder**: *None*
     * - **API ID Path**: page.title
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    title: prismicT.TitleField;
    /**
     * Description field in *Page*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: page.description
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    description: prismicT.RichTextField;
    /**
     * Thumbnail field in *Page*
     *
     * - **Field Type**: Link to Media
     * - **Placeholder**: *None*
     * - **API ID Path**: page.thumbnail
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
     *
     */
    thumbnail: prismicT.LinkToMediaField;
    /**
     * type field in *Page*
     *
     * - **Field Type**: Select
     * - **Placeholder**: *None*
     * - **Default Value**: Default
     * - **API ID Path**: page.type
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/select
     *
     */
    type: prismicT.SelectField<"Default" | "Home" | "Sketchooks" | "Projects" | "Project" | "About", "filled">;
    /**
     * Parent field in *Page*
     *
     * - **Field Type**: Content Relationship
     * - **Placeholder**: *None*
     * - **API ID Path**: page.parent
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
     *
     */
    parent: prismicT.RelationField<"page">;
    /**
     * Tags field in *Page*
     *
     * - **Field Type**: Group
     * - **Placeholder**: *None*
     * - **API ID Path**: page.tags[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/group
     *
     */
    tags: prismicT.GroupField<Simplify<PageDocumentDataTagsItem>>;
    /**
     * Slice Zone field in *Page*
     *
     * - **Field Type**: Slice Zone
     * - **Placeholder**: *None*
     * - **API ID Path**: page.slices[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/slices
     *
     */
    slices: prismicT.SliceZone<PageDocumentDataSlicesSlice>;
}
/**
 * Item in Page → Tags
 *
 */
export interface PageDocumentDataTagsItem {
    /**
     * Name field in *Page → Tags*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: page.tags[].name
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    name: prismicT.KeyTextField;
}
/**
 * Slice for *Page → Slice Zone*
 *
 */
type PageDocumentDataSlicesSlice = never;
/**
 * Page document from Prismic
 *
 * - **API ID**: `page`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PageDocument<Lang extends string = string> = prismicT.PrismicDocumentWithUID<Simplify<PageDocumentData>, "page", Lang>;
/** Content for settings documents */
interface SettingsDocumentData {
    /**
     * Site Title field in *settings*
     *
     * - **Field Type**: Title
     * - **Placeholder**: Title of the site
     * - **API ID Path**: settings.siteTitle
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    siteTitle: prismicT.TitleField;
    /**
     * Socials field in *settings*
     *
     * - **Field Type**: Group
     * - **Placeholder**: *None*
     * - **API ID Path**: settings.socials[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/group
     *
     */
    socials: prismicT.GroupField<Simplify<SettingsDocumentDataSocialsItem>>;
    /**
     * Description field in *settings*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: Meta description de la page
     * - **API ID Path**: settings.description
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    description: prismicT.RichTextField;
    /**
     * Thumbnail field in *settings*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: settings.thumbnail
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/image
     *
     */
    thumbnail: prismicT.ImageField<never>;
}
/**
 * Item in settings → Socials
 *
 */
export interface SettingsDocumentDataSocialsItem {
    /**
     * Name field in *settings → Socials*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: settings.socials[].name
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    name: prismicT.KeyTextField;
    /**
     * Link field in *settings → Socials*
     *
     * - **Field Type**: Link
     * - **Placeholder**: *None*
     * - **API ID Path**: settings.socials[].link
     * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
     *
     */
    link: prismicT.LinkField;
}
/**
 * settings document from Prismic
 *
 * - **API ID**: `settings`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SettingsDocument<Lang extends string = string> = prismicT.PrismicDocumentWithoutUID<Simplify<SettingsDocumentData>, "settings", Lang>;
export type AllDocumentTypes = MenuDocument | PageDocument | SettingsDocument;
/**
 * Item in LoadingImage → Items
 *
 */
export interface LoadingImageSliceDefaultItem {
    /**
     * Media field in *LoadingImage → Items*
     *
     * - **Field Type**: Link to Media
     * - **Placeholder**: *None*
     * - **API ID Path**: loading_image.items[].media
     * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
     *
     */
    media: prismicT.LinkToMediaField;
}
/**
 * Default variation for LoadingImage Slice
 *
 * - **API ID**: `default`
 * - **Description**: `LoadingImage`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type LoadingImageSliceDefault = prismicT.SharedSliceVariation<"default", Record<string, never>, Simplify<LoadingImageSliceDefaultItem>>;
/**
 * Slice variation for *LoadingImage*
 *
 */
type LoadingImageSliceVariation = LoadingImageSliceDefault;
/**
 * LoadingImage Shared Slice
 *
 * - **API ID**: `loading_image`
 * - **Description**: `LoadingImage`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type LoadingImageSlice = prismicT.SharedSlice<"loading_image", LoadingImageSliceVariation>;
/**
 * Primary content in SketchBook → Primary
 *
 */
interface SketchBookSliceDefaultPrimary {
    /**
     * Title field in *SketchBook → Primary*
     *
     * - **Field Type**: Title
     * - **Placeholder**: This is where it all begins...
     * - **API ID Path**: sketch_book.primary.title
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    title: prismicT.TitleField;
    /**
     * Description field in *SketchBook → Primary*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: A nice description of your product
     * - **API ID Path**: sketch_book.primary.description
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    description: prismicT.RichTextField;
}
/**
 * Default variation for SketchBook Slice
 *
 * - **API ID**: `default`
 * - **Description**: `SketchBook`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type SketchBookSliceDefault = prismicT.SharedSliceVariation<"default", Simplify<SketchBookSliceDefaultPrimary>, never>;
/**
 * Slice variation for *SketchBook*
 *
 */
type SketchBookSliceVariation = SketchBookSliceDefault;
/**
 * SketchBook Shared Slice
 *
 * - **API ID**: `sketch_book`
 * - **Description**: `SketchBook`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type SketchBookSlice = prismicT.SharedSlice<"sketch_book", SketchBookSliceVariation>;
/**
 * Item in Socials → Items
 *
 */
export interface SocialsSliceDefaultItem {
    /**
     * Name field in *Socials → Items*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: socials.items[].name
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    name: prismicT.KeyTextField;
    /**
     * Link field in *Socials → Items*
     *
     * - **Field Type**: Link
     * - **Placeholder**: *None*
     * - **API ID Path**: socials.items[].link
     * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
     *
     */
    link: prismicT.LinkField;
}
/**
 * Default variation for Socials Slice
 *
 * - **API ID**: `default`
 * - **Description**: `Socials`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type SocialsSliceDefault = prismicT.SharedSliceVariation<"default", Record<string, never>, Simplify<SocialsSliceDefaultItem>>;
/**
 * Slice variation for *Socials*
 *
 */
type SocialsSliceVariation = SocialsSliceDefault;
/**
 * Socials Shared Slice
 *
 * - **API ID**: `socials`
 * - **Description**: `Socials`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type SocialsSlice = prismicT.SharedSlice<"socials", SocialsSliceVariation>;
declare module "@prismicio/client" {
    interface CreateClient {
        (repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
    }
    namespace Content {
        export type { MenuDocumentData, MenuDocumentDataLinksItem, MenuDocument, PageDocumentData, PageDocumentDataTagsItem, PageDocumentDataSlicesSlice, PageDocument, SettingsDocumentData, SettingsDocumentDataSocialsItem, SettingsDocument, AllDocumentTypes, LoadingImageSliceDefaultItem, LoadingImageSliceDefault, LoadingImageSliceVariation, LoadingImageSlice, SketchBookSliceDefaultPrimary, SketchBookSliceDefault, SketchBookSliceVariation, SketchBookSlice, SocialsSliceDefaultItem, SocialsSliceDefault, SocialsSliceVariation, SocialsSlice };
    }
}
