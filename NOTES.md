### Prismic type in generated ts

```` javascript
import CustomTypesClient from "@prismicio/custom-types-client/dist/index";
import {CustomTypesClientConfig} from "@prismicio/custom-types-client";
(repositoryNameOrEndpoint?: string, options?: CustomTypesClientConfig): typeof CustomTypesClient;
````

### PRISMIC CLI

[DOC](https://prismic.io/docs/technical-reference/prismic-cli)

### TODO

* **(VCarousel)**: Add VCarouselLoop from modelec
* **(Config)** Fix TS error type on build
* **(Config)** Register Prismic component (ex: PrismicRichText | SliceZone')
* **(Setup)** Add storybook ?
* **(Setup)** Prettier vs EsLint conflict
* **(PrismicTypeModule)** import correctly **shim** client types _(ex: context.$prismic.api.query())_
* **(Slice)**: CarouselMedia | RandomGridImage | *ProjectListing (layout: carousel || grid)*
* **(VLink && VButton)**: add PrismicLink && PrismicDocument

#### DONE

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

#### RESOURCES

[Push changes to prismic](https://prismic.io/docs/slice-machine#push-changes-to-prismic)
[Prismic nice tuto](https://www.hamedbahram.io/notes/prismic)
[Import shim client type](https://github.com/prismicio/prismic-vue/issues/5#issuecomment-493795628)
