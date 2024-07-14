import { Client } from '@elastic/elasticsearch';

export const elasticSearch = new Client({
  node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
  headers: {
    'Content-Type': 'application/json',
  },
});
