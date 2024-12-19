import React from 'react';
import { ProfileIcon, FriendIcon, MessageIcon, PostIcon, ReactionsIcon, FavoritesIcon, AdvertisingIcon } from '../../../shared/icons/index';

export const navLinks = [
  { id: 1, path: "/profile", label: "Профиль", icon: ProfileIcon },
  { id: 2, path: "/friends", label: "Друзья", icon: FriendIcon },
  { id: 3, path: "/messenger", label: "Сообщения", icon: MessageIcon },
  { id: 4, path: "/posts", label: "Статьи", icon: PostIcon },
  { id: 5, path: "/reactions", label: "Реакции", icon: ReactionsIcon },
  { id: 6, path: "/favorites", label: "Избранное", icon: FavoritesIcon },
  { id: 7, path: "/advertising", label: "Реклама", icon: AdvertisingIcon },
];
