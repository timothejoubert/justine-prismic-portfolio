### Prismic type in generated ts

```` javascript
import CustomTypesClient from "@prismicio/custom-types-client/dist/index";
import {CustomTypesClientConfig} from "@prismicio/custom-types-client";
(repositoryNameOrEndpoint?: string, options?: CustomTypesClientConfig): typeof CustomTypesClient;
````

### PRISMIC CLI

[DOC](https://prismic.io/docs/technical-reference/prismic-cli)

### IN PROGRESS

* **(SSR)**: Menu & Projects listing aren't load in ssr
* **(Project)**: /projects/slug url aren't link to _uid.vue page
* **(VLink && VButton)**: add PrismicLink && PrismicDocument

### TODO

* **(PrismicTypeModule)** import correctly **shim** client types _(ex: context.$prismic.api.query())_
* **(Home)** Create Home Type (display all slice only on it)
* **(Internalization)** Set Fr as Default
  locale: [Forum](https://community.prismic.io/t/changing-the-main-locale-language/1010)
* **(VImage)** Faire custom VImage a partir de PrismicImage component
* **(Config)** Register Prismic component (ex: PrismicRichText | SliceZone')
* **(Setup)** Add storybook ?
* **(Slice)**: CarouselMedia | RandomGridImage | ProjectListing (layout: carousel && grid)
* **(VCarousel)**: Add VCarouselLoop from modelec

#### DONE

* **(Slice)**: RandomGridImage
* **(Setup)**: Clean prismic/utils files and methods names
* **(Bug)**: PageProject error => mixin page not load when try to access project/slug.html ?
* **(Setup)** Prettier vs EsLint conflict
* **(Config)** Fix TS error type on build
* **(Config)** Fix "Could not find a declaration file for module '@prismicio/vue/components'." on build
* **(Data)**: Sync prismic-repo data with local
* **(Config)**: Set esLint on save
* **(Config)**: Add preview
* **(VButton)**: adapt for use it as VPill (ref: modelec || boegli)

#### ABANDONED

* **(Hydratation)**: fetch by data projects

#### LATER

* **(Config)**: I18n
* **(Nav && Config)**: Configure nested route

CustomType:

- HomePage
- CustomPage [type: Sketchbooks | ProjectList | About]
- ProjectPage
- DefaultPage [Contact | Informations | Awwwards]
- CommonContent [Menu | socials | siteInfo]

#### RESOURCES

[Augmenting Global Properties | Vue type](https://vuejs.org/guide/typescript/options-api.html#augmenting-global-properties)
[Push changes to prismic](https://prismic.io/docs/slice-machine#push-changes-to-prismic)
[Prismic nice tuto](https://www.hamedbahram.io/notes/prismic)
[Import shim client type](https://github.com/prismicio/prismic-vue/issues/5#issuecomment-493795628)
