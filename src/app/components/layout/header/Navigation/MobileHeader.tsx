'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react/dist/iconify.js';

type MobileHeaderProps = {
    item: any;
    index: number;
    onNavigate?: () => void;
};

const MobileHeader: React.FC<MobileHeaderProps> = ({ item, index, onNavigate }) => {
    const pathname = usePathname();
    const isActive = pathname === item.href;

    return (
        <Link
            href={item.href}
            onClick={onNavigate}
            className="group block"
            style={{ animationDelay: `${index * 60}ms` }}
        >
            <div className={`flex items-center justify-between py-4 px-1 border-b border-dark_black/[0.06] dark:border-white/[0.06] transition-all duration-300 group-hover:pl-3 group-hover:border-purple_blue/30 ${isActive ? 'border-purple_blue/40' : ''
                }`}>
                <span className={`text-[1.35rem] font-medium tracking-tight transition-colors duration-300 ${isActive
                    ? 'text-purple_blue'
                    : 'text-dark_black/80 dark:text-white/80 group-hover:text-dark_black dark:group-hover:text-white'
                    }`}>
                    {item.label}
                </span>
                <Icon
                    icon="solar:arrow-right-up-linear"
                    className={`w-5 h-5 transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 ${isActive ? 'opacity-100 translate-x-0 text-purple_blue' : 'text-dark_black/40 dark:text-white/40'
                        }`}
                />
            </div>
        </Link>
    );
};

export default MobileHeader;
