import * as prismicT from "@prismicio/types";
import {FilledContentRelationshipField} from "@prismicio/types/src/value/contentRelationship";

export const isInternalLinkFulled = (link: prismicT.LinkField): link is FilledContentRelationshipField => {
    return link?.uid || link?.url || link?.slug
}
