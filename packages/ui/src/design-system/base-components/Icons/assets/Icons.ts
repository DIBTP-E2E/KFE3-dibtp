import { FaAngleDown, FaAngleLeft, FaAngleRight, FaAngleUp } from 'react-icons/fa6';
import { GoBellFill, GoBell, GoHeartFill, GoHeart, GoHome, GoHomeFill } from 'react-icons/go';
import { BsClockFill, BsClock, BsChat, BsChatFill } from 'react-icons/bs';
import { RxHamburgerMenu } from 'react-icons/rx';
import { MdRefresh, MdOutlinePhotoCamera } from 'react-icons/md';
import { PiMagnifyingGlassBold, PiExport, PiExportFill } from 'react-icons/pi';
import { HiOutlineShoppingBag, HiShoppingBag, HiSearch } from 'react-icons/hi';
import { HiXMark } from 'react-icons/hi2';
import { CiClock1 } from 'react-icons/ci';

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
  ClockThin: CiClock1,

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

  Search: HiSearch,

  Cancel: HiXMark,
};
