import Link from 'next/link'
import clsx from 'clsx'

const baseStyles = {
  solid:
    'inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold outline-2 outline-offset-2 transition-colors',
  outline:
    'inline-flex justify-center rounded-lg border py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm outline-2 outline-offset-2 transition-colors',
}

const variantStyles = {
  solid: {
    cyan: 'relative overflow-hidden bg-cyan-500 text-white before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-cyan-600 active:text-white/80 before:transition-colors',
    white:
      'bg-white text-cyan-900 hover:bg-white/90 active:bg-white/90 active:text-cyan-900/70',
    gray: 'bg-gray-800 text-white hover:bg-gray-900 active:bg-gray-800 active:text-white/80',
  },
  outline: {
    gray: 'border-gray-300 text-gray-700 hover:border-gray-400 active:bg-gray-100 active:text-gray-700/80',
  },
}

type ButtonProps = (
  | {
      variant?: 'solid'
      color?: keyof typeof variantStyles.solid
    }
  | {
      variant: 'outline'
      color?: keyof typeof variantStyles.outline
    }
) &
  (
    | Omit<React.ComponentPropsWithoutRef<typeof Link>, 'color'>
    | (Omit<React.ComponentPropsWithoutRef<'button'>, 'color'> & {
        href?: undefined
      })
  )

export function Button({ className, ...props }: ButtonProps) {
  props.variant ??= 'solid';
  props.color ??= 'gray';

  // 定义 hover 样式的 TypeScript 类型
  type HoverStyles = {
    [key in 'solid' | 'outline']: {
      [color in 'gray' | 'indigo' | 'cyan' | 'white']: string
    }
  };

  // 填充 hoverStyles 对象，包括所有必要的颜色键
  const hoverStyles: HoverStyles = {
    solid: {
      gray: 'hover:bg-gray-400',
      indigo: 'hover:bg-indigo-500',
      cyan: 'hover:bg-cyan-400', // 假设的 cyan hover 样式
      white: 'hover:bg-white-400', // 假设的 white hover 样式
    },
    outline: {
      gray: 'hover:bg-gray-100',
      indigo: 'hover:bg-indigo-100',
      cyan: 'hover:bg-cyan-100', // 假设的 cyan hover 样式
      white: 'hover:bg-white-100', // 假设的 white hover 样式
    },
  };

  // 根据props.variant和props.color获取相应的hover样式
  const currentHoverStyle = hoverStyles[props.variant]
    ? hoverStyles[props.variant][props.color]
    : undefined;

  className = clsx(
    // 基础样式
    baseStyles[props.variant],
    // 根据variant和color获取的样式
    props.variant === 'outline'
      ? variantStyles.outline[props.color]
      : props.variant === 'solid'
        ? variantStyles.solid[props.color]
        : undefined,
    // hover样式
    currentHoverStyle,
    // 外部传入的className
    className,
  );

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  );
}
