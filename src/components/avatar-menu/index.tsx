import { useLogout } from '@/hooks/use-logout';
import { User } from '@/types/user';
import { CircleUser, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface AvatarMenuProsp {
	user: User | null;
}

export const AvatarMenu = ({ user }: AvatarMenuProsp) => {
	const handleLogout = useLogout();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarFallback className="text-zinc-950">
						{user?.name[0]}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				align="end"
				className="bg-zinc-950 w-56 border-zinc-800"
			>
				<DropdownMenuLabel>
					<p className="text-sm text-zinc-100">{user?.name}</p>
					<p className="text-zinc-400 text-xs">{user?.email}</p>
				</DropdownMenuLabel>

				<DropdownMenuSeparator className="bg-zinc-800" />

				<DropdownMenuItem
					className="text-zinc-100 focus:bg-zinc-800 focus:text-zinc-50"
					asChild
				>
					<Link to="/profile">
						<CircleUser className="text-base mr-2" />
						Perfil
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem className="text-zinc-100 focus:bg-zinc-800 focus:text-zinc-50">
					<CircleUser className="text-base mr-2" />
					Perfil
				</DropdownMenuItem>
				<DropdownMenuItem className="text-zinc-100 focus:bg-zinc-800 focus:text-zinc-50">
					<CircleUser className="text-base mr-2" />
					Perfil
				</DropdownMenuItem>

				<DropdownMenuSeparator className="bg-zinc-800" />

				<DropdownMenuItem
					className="text-zinc-100 focus:bg-zinc-800 focus:text-zinc-50"
					onClick={handleLogout}
				>
					<LogOut className="text-base mr-2" />
					Sair
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
