### Prismic type in generated ts 

```` javascript
import CustomTypesClient from "@prismicio/custom-types-client/dist/index";
import {CustomTypesClientConfig} from "@prismicio/custom-types-client";
(repositoryNameOrEndpoint?: string, options?: CustomTypesClientConfig): typeof CustomTypesClient;
````


### TODO

* **(PrismicTypeModule)** import correctly **shim** client types _(ex: context.$prismic.api.query())_
* **(Data)**: Sync prismic-repo data with local
* **(Hydratation)**: fetch by data projects
* **(Config)**: Add preview
* **(Slice)**: CarouselMedia | RandomGridImage |
* **(VButton)**: adapt for use it as VPill (ref: modelec || boegli)


#### DONE
* **(Config)**: Set esLint on save


#### LATER  
* **(Config)**: I18n  
* **(Nav && Config)**: Configure nested route


#### RESOURCES
[Prismic nice tuto](https://www.hamedbahram.io/notes/prismic)
[Import shim client type](https://github.com/prismicio/prismic-vue/issues/5#issuecomment-493795628)
