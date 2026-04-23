import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps { }
const Logo: React.FC<HeaderProps> = () => {
    return (
        <Link href="/">
            <span className="relative inline-block">
                <Image
                    src="/images/logo/logo.png"
                    alt="HABB logo"
                    width={160}
                    height={46}
                    quality={100}
                    priority={true}
                    className="relative w-[120px] md:w-[160px] h-auto dark:hidden"
                />
                <Image
                    src="/images/logo/DarkModeLogo.png"
                    alt="HABB logo dark"
                    width={160}
                    height={46}
                    quality={100}
                    priority={true}
                    className="relative hidden dark:block w-[120px] md:w-[160px] h-auto"
                />
            </span>
        </Link>
    );
};

export default Logo;
