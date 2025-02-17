import { XMLParser } from 'fast-xml-parser';

export interface PodcastEpisode {
    title: string;
    description: string;
    link: string;
    pubDate: string;
    image: string;
}

export async function fetchPodcastEpisodes(): Promise<PodcastEpisode[]> {
    try {
        const response = await fetch('https://www.ivoox.com/feed_fg_f12107328_filtro_1.xml');
        const xmlData = await response.text();
        
        const parser = new XMLParser();
        const result = parser.parse(xmlData);
        
        const episodes = result.rss.channel.item.map((item: any) => ({
            title: item.title,
            description: item.description,
            link: item.link,
            pubDate: item.pubDate,
            image: result.rss.channel.image?.url || '/assets/imgs/home-page-3/podcast-default.jpg'
        }));
        
        return episodes;
    } catch (error) {
        console.error('Error fetching podcast episodes:', error);
        return [];
    }
}
