import { FaAngleDown, FaAngleLeft, FaAngleRight, FaAngleUp } from 'react-icons/fa6';
import { GoBellFill, GoBell, GoHeartFill, GoHeart, GoHome, GoHomeFill } from 'react-icons/go';
import { BsClockFill, BsClock, BsChat, BsChatFill } from 'react-icons/bs';
import { RxHamburgerMenu } from 'react-icons/rx';
import { HiOutlineShoppingBag, HiShoppingBag, HiSearch } from 'react-icons/hi';
import { HiXMark } from 'react-icons/hi2';
import { CiClock1 } from 'react-icons/ci';
import {
  PiMagnifyingGlassBold,
  PiExport,
  PiExportFill,
  PiUser,
  PiUserFill,
  PiWarningFill,
  PiWarningLight,
} from 'react-icons/pi';
import {
  MdRefresh,
  MdOutlinePhotoCamera,
  MdOutlineLocationOn,
  MdMoreVert,
  MdMyLocation,
} from 'react-icons/md';
import { IoSend, IoSettingsOutline, IoSettingsSharp } from 'react-icons/io5';
import { VscError } from 'react-icons/vsc';

export const ICONS = {
  ArrowDown: FaAngleDown,
  ArrowLeft: FaAngleLeft,
  ArrowRight: FaAngleRight,
  ArrowUp: FaAngleUp,

  BellFill: GoBellFill,
  Bell: GoBell,

  HeartFill: GoHeartFill,
  Heart: GoHeart,

  WarningFill: PiWarningFill,
  Warning: PiWarningLight,

  Error: VscError,

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
  SendFill: IoSend,

  ShoppingBag: HiOutlineShoppingBag,
  ShoppingBagFill: HiShoppingBag,

  Export: PiExport,
  ExportFill: PiExportFill,

  User: PiUser,
  UserFill: PiUserFill,

  Location: MdOutlineLocationOn,
  CurrentLocation: MdMyLocation,

  Search: HiSearch,

  Cancel: HiXMark,

  MoreVert: MdMoreVert,

  Setting: IoSettingsOutline,
  SettingFill: IoSettingsSharp,
};
