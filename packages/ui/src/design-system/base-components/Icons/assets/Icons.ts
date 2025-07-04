import { FaAngleDown, FaAngleLeft, FaAngleRight, FaAngleUp } from 'react-icons/fa6';
import { GoBellFill, GoBell, GoHeartFill, GoHeart, GoHome, GoHomeFill } from 'react-icons/go';
import { BsClockFill, BsClock, BsChat, BsChatFill } from 'react-icons/bs';
import { RxHamburgerMenu } from 'react-icons/rx';
import { MdRefresh, MdOutlinePhotoCamera } from 'react-icons/md';
import { PiMagnifyingGlassBold, PiExport, PiExportFill } from 'react-icons/pi';
import { HiOutlineShoppingBag, HiShoppingBag } from 'react-icons/hi';

export const ICONS = {
  ArrowDown: FaAngleDown,
  ArrowLeft: FaAngleLeft,
  ArrowRight: FaAngleRight,
  ArrowUp: FaAngleUp,

  BellFill: GoBellFill,
  Bell: GoBell,
  HeartFill: GoHeartFill,
  Heart: GoHeart,

  ClockFill: BsClockFill,
  Clock: BsClock,

  Hamburger: RxHamburgerMenu,

  Refresh: MdRefresh,
  Photo: MdOutlinePhotoCamera,

  MagnifyingGlass: PiMagnifyingGlassBold,

  Home: GoHome,
  HomeFill: GoHomeFill,
  Chat: BsChat,
  ChatFill: BsChatFill,

  ShoppingBag: HiOutlineShoppingBag,
  ShoppingBagFill: HiShoppingBag,

  Export: PiExport,
  ExportFill: PiExportFill,
};

export type IconName = keyof typeof ICONS;
