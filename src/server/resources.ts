import * as fs from 'fs'
import * as matter from 'gray-matter'


const getResources = () => {
    let resources = {}
    // TODO make resources location configurable
    const resourceDir = '/app/server/resources/'

    // read in all the markdown files in ./resources and produce a resources object
    fs.readdir(resourceDir, (err, filenames) => {
        if (err) {
            console.log(err)
            return {}
        }
        filenames.forEach((filename) => {
            fs.readFile(resourceDir + filename, 'utf8', (err, data) => {
                if (err) {
                    return
                }
                const [contentName, format] = filename.split('.')
                if (format !== "md") {
                    console.log(`WARNING: ${format} not supported expect [md]`)
                    return
                }
                const parsedFrontmatter = matter(data)
                resources[contentName] = {
                    content: parsedFrontmatter.content,
                    ...parsedFrontmatter.data,
                }
            })
        })
    })
    return resources
}

export default getResources
