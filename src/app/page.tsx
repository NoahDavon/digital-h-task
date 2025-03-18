import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {User} from "@/app/types";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default async function Home() {
    const {users, error} : { users: User[], error:  string } = await fetch(process.env.URL + "/api/user").then(res => {
        if (res.status === 200) return res.json()
        return {error: res.json()};
    }).catch((err) => {
        return {error: err}
    });
    if(error) return <div className={"bg-amber-700 text-white"}>Oops! Something went wrong! Try refreshing...</div>
    return (
        <div className={"flex flex-col justify-center items-center min-h-96"}>
            <Card className={"bg-slate-600 text-white rounded-lg shadow-sm w-2/3 py-8 border-0"}>
                <CardHeader>
                    <CardTitle>Welcome, Admin!</CardTitle>
                    <CardDescription className={"text-white"}>You have {users.length} active users!</CardDescription>
                </CardHeader>
                <CardContent className={"flex gap-8 max-h-40 items-center overflow-x-scroll snap-center"}>
                    {(users as User[]).slice(0, 50).map((user) => (
                        <Avatar key={user.id} className={"w-18 h-18 rounded-full"}>
                            <AvatarImage src={`https://i.pravatar.cc/150?u=${user.email}`}/>
                            <AvatarFallback>{user.first_name.at(0)??"" + user.last_name?.at(0)}</AvatarFallback>
                        </Avatar>
                    ))}
                </CardContent>
                <CardFooter className={"flex gap-2 sm:gap-8"}>
                    <Link href="/">
                        <Button variant="outline" size="default" className={"text-black cursor-pointer hover:bg-slate-300"}>
                            Add User
                        </Button>
                    </Link>
                    <Link href="/">
                        <Button size="default" className={"cursor-pointer hover:bg-slate-700"}>
                            View All Users
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
