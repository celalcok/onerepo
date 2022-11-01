import { scrapTopics } from '../utils/scrapTopics'
import { FormatTopic, Locale, PageSelectors, Publisher } from '../utils/types'

const getSamanyoluNews = async () => {
  const url = new URL('https://www.samanyoluhaber.com')

  const selectors: PageSelectors = {
    link: 'div.slider.main-slider.sh-slider.ana-manset div.item a',
    title: 'meta[itemProp="name"]',
    time: 'meta[itemProp="datePublished"]',
  }

  const formatTopic: FormatTopic = topic => {
    return {
      ...topic,
    }
  }

  return await scrapTopics({
    publisher: Publisher.SAMANYOLU,
    locale: Locale.TR,
    url,
    selectors,
    formatTopic,
  })
}

export default getSamanyoluNews