import { FaAngleDown, FaAngleLeft, FaAngleRight, FaAngleUp } from 'react-icons/fa6';
import { GoBellFill, GoBell, GoHeartFill, GoHeart } from 'react-icons/go';
import { BsClockFill, BsClock } from 'react-icons/bs';
import { RxHamburgerMenu } from 'react-icons/rx';
import { MdRefresh } from 'react-icons/md';
import { PiMagnifyingGlassBold } from 'react-icons/pi';

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

  MagnifyingGlass: PiMagnifyingGlassBold,
};

export type IconName = keyof typeof ICONS;
