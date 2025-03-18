import Link from "next/link";
import {
    NavigationMenu, NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "../../components/ui/navigation-menu";
import {Card, CardContent} from "../../components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "../../components/ui/avatar";
import {User} from "../../app/types";

export default async function Users() {
    const {users, error}: { users: User[], error: string } = await fetch(process.env.URL + "/api/user").then(res => {
        if (res.status === 200) return res.json()
        return {error: res.json()};
    }).catch((err) => {
        return {error: err}
    });
    if (error) return <div className={"bg-amber-700 text-white"}>Oops! Something went wrong! Try refreshing...</div>
    return (
        <div>
            <nav
                className="fixed rounded-b-lg py-4 inset-x-0 top-0 z-50 bg-slate-400 opacity-40 text-black shadow-sm translate-y-0 md:translate-y-0/2 dark:bg-gray-950">
                <div className="container px-4 md:px-6">
                    <NavigationMenu>
                        <NavigationMenuList className="flex w-full gap-4 items-center">
                            <div>Here are your users in all their glory!</div>
                            <NavigationMenuItem>
                                <Link legacyBehavior passHref
                                      href="/">
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Home
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link legacyBehavior passHref
                                      href="/">
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Add User
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </nav>
            <div className="container mx-auto py-32 px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {users.map((user) => (
                        <Card key={user.id} className="overflow-scroll bg-slate-500 text-white border-0">
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={`https://i.pravatar.cc/150?u=${user.email}`}/>
                                        <AvatarFallback>{user.first_name.at(0) ?? "" + user.last_name?.at(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-1">
                                        <h3 className="font-medium">{`${user.first_name} ${user.last_name}`}</h3>
                                        <p className="text-sm text-white">{user.email}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};
