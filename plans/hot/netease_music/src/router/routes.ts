interface NavRoute {
  isLink: boolean;
  to: string;
  name: string;
}

const navRoutes: NavRoute[] = [
  {
    isLink: true,
    to: '/discover',
    name: '发现音乐',
  },
  {
    isLink: true,
    to: '/my',
    name: '我的音乐',
  },
  {
    isLink: true,
    to: '/follow',
    name: '关注',
  },
  {
    isLink: false,
    to: 'about:blank',
    name: '商城',
  },
  {
    isLink: false,
    to: 'about:blank',
    name: '音乐人',
  },
  {
    isLink: false,
    to: 'about:blank',
    name: '云推歌',
  },
  {
    isLink: true,
    to: '/download',
    name: '下载客户端',
  },
];

export type { NavRoute };
export { navRoutes };
