import {PrismicDocument} from "@prismicio/types/src/value/document";

const prismicHtmlSerializer = (type: string, element: PrismicDocument, content: any, children: { join(content: string): string}) => {
    switch (type) {
        case 'heading1':
            return /* html */ `<h1 class="font-semibold leading-tight tracking-tight md:leading-tight text-4xl md:text-5xl mb-7 mt-12 first:mt-0 last:mb-0">${children.join('')}</h1>`

        case 'heading2':
            return /* html */ `<h2 class="font-semibold leading-tight tracking-tight md:leading-tight text-3xl md:text-4xl mb-7 mt-12 first:mt-0 last:mb-0">${children.join('')}</h2>`

        case 'heading3':
            return /* html */ `<h3 class="font-semibold leading-tight tracking-tight md:leading-tight text-xl md:text-2xl mb-7 mt-12 first:mt-0 last:mb-0">${children.join('')}</h3>`

        case 'paragraph':
            return /* html */ `<p class="mb-7 last:mb-0">${children.join('')}</p>`

        case 'group-o-list-item':
            return /* html */ `<ol class="mb-7 pl-4 last:mb-0 md:pl-6">${children.join('')}</ol>`

        case 'o-list-item':
            return /* html */ `<li class="mb-1 list-decimal pl-1 last:mb-0 md:pl-2">${children.join('')}</li>`

        case 'group-list-item':
            return /* html */ `<ul class="mb-7 pl-4 last:mb-0 md:pl-6">${children.join('')}</ul>`

        case 'list-item':
            return /* html */ `<li class="mb-1 list-disc pl-1 last:mb-0 md:pl-2">${children.join('')}</li>`

        case 'preformatted':
            return /* html */ `<pre class="mb-7 rounded bg-slate-100 p-4 text-sm last:mb-0 md:p-8 md:text-lg">
                <code>${children.join('')}</code>
            </pre>`

        case 'strong':
            return /* html */ `<strong class="font-semibold">${children.join('')}</strong>`

        case 'hyperlink':
            return /* html */ `<a href="${element.data.url}" class="underline decoration-1 underline-offset-2">${children.join('')}</a>`

        default:
            return null
    }
}

module.exports = prismicHtmlSerializer;
