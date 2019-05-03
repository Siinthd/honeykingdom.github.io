import { STREAM_SERVICES } from './streamServices';

const CHANNEL_SEPARATOR = '@';
const CHATS_SEPARATOR = ',';

const DEFAULT_PLAYER = { service: 'twitch', payload: 'honeymad' };

const DEFAULT_CHATS = [
  { id: 1, service: 'twitch', payload: 'honeymad' },
  { id: 2, service: 'twitch', payload: 'nytick' },
];

const isValidStreamService = streamService => streamService && Object.values(STREAM_SERVICES).includes(streamService.service);

const getStreamService = (urlParam) => {
  if (!urlParam) return null;

  const streamService = urlParam.split(CHANNEL_SEPARATOR);

  if (streamService.length === 1) {
    const [payload] = streamService;
    return { id: urlParam, service: STREAM_SERVICES.TWITCH, payload };
  }

  if (streamService.length === 2) {
    const [service, payload] = streamService;
    return { id: urlParam, service, payload };
  }

  return null;
};

export const getPlayerFromUrl = (urlParam) => {
  const player = getStreamService(urlParam);

  return isValidStreamService(player) ? player : DEFAULT_PLAYER;
};

export const getChatsFromUrl = (urlParam) => {
  if (!urlParam) return DEFAULT_CHATS;

  const chats = urlParam
    .split(CHATS_SEPARATOR)
    .map(chat => getStreamService(chat))
    .filter(chat => chat && isValidStreamService(chat));

  return chats.length > 0 ? chats : DEFAULT_CHATS;
};
