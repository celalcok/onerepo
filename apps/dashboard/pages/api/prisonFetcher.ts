import { NextApiRequest, NextApiResponse } from 'next'

const cleanText = (text: string) => {
  return text
    .replace(/&#(\d+);/g, (match, kod) => String.fromCharCode(kod))
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x(\d+);/g, (match, kod) =>
      String.fromCharCode(parseInt(kod, 16)),
    )
}

// TODO add a button for prisons data-table then get data from here and update database if there are new prisons.

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const html = await fetch('https://cte.adalet.gov.tr/home/haritaliste').then(
      res => res.text(),
    )
    const regex =
      /<tr class="clickable-row".*?>\s*<td>\s*(.*?)\s*<\/td>\s*<td>\s*(.*?)\s*<\/td>/g

    let match
    const results: { city: string; name: string }[] = []

    while ((match = regex.exec(html)) !== null) {
      if (match[1] && match[2]) {
        results.push({
          city: cleanText(match[1].trim()),
          name: cleanText(match[2].trim()),
        })
      } else {
        console.error('An error happened while parsing the html', match)
      }
    }

    res.status(200).json({ results })
  } catch (error) {
    console.error('An error happened while saving translations', error)
    res.status(500).end()
  }
}
