import { IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

export function SectionCards() {
  return (
    <div className="flex max-sm:flex-col max-sm:space-y-5 max-sm:justify-center mb-10 w-full justify-center items-start mx-auto space-x-5 px-5">
      <Card className="w-fit min-w-xs">
        <CardHeader>
          <CardDescription>Encryption Simulator App</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            1,280{" "}
            <small className="text-xs text-green-700 italic">
              successful test
            </small>
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +99.4%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col justify-between space-y-5 text-sm">
          <div className="flex-row items-start space-y-2 text-sm w-full">
            <div className="line-clamp-1 flex gap-2 font-medium text-xs">
              Message compressed is 100% accurate.
            </div>
            <div className="text-muted-foreground text-xs italic">
              15 Visitors for the last 6 months...
            </div>
          </div>
          <CardAction className="flex-1 justify-center text-center gap-1.5">
            <Button variant="outline" size="sm" asChild>
              <Link href="encrypter-simulator">Open Encryption Simulator</Link>
            </Button>
          </CardAction>
        </CardFooter>
      </Card>

      <Card className="w-fit min-w-xs">
        <CardHeader>
          <CardDescription>Decryption Simulator App</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            1,980{" "}
            <small className="text-xs text-green-700 italic">
              successful test
            </small>
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +99.8%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col justify-between space-y-5 text-sm">
          <div className="flex-row items-start space-y-2 text-sm w-full">
            <div className="line-clamp-1 flex gap-2 font-medium text-xs">
              Message decompressed is 100% accurate.
            </div>
            <div className="text-muted-foreground text-xs italic">
              18 Visitors for the last 6 months...
            </div>
          </div>
          <CardAction className="flex-1 justify-center text-center gap-1.5">
            <Button variant="outline" size="sm" asChild>
              <Link href="decrypter-simulator">Open Decryption Simulator</Link>
            </Button>
          </CardAction>
        </CardFooter>
      </Card>

      <Card className="w-fit min-w-xs">
        <CardHeader>
          <CardDescription>Encryption App</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            1,645{" "}
            <small className="text-xs text-green-700 italic">
              successful test
            </small>
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +99.4%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col justify-between space-y-5 text-sm">
          <div className="flex-row items-start space-y-2 text-sm w-full">
            <div className="line-clamp-1 flex gap-2 font-medium text-xs">
              Message compressed is 100% accurate.
            </div>
            <div className="text-muted-foreground text-xs italic">
              19 Visitors for the last 6 months...
            </div>
          </div>
          <CardAction className="flex-1 justify-center text-center gap-1.5">
            <Button variant="outline" size="sm" asChild>
              <Link href="encrypter">Open Encryption App</Link>
            </Button>
          </CardAction>
        </CardFooter>
      </Card>

      <Card className="w-fit min-w-xs">
        <CardHeader>
          <CardDescription>Decryption App</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            1,370{" "}
            <small className="text-xs text-green-700 italic">
              successful test
            </small>
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +99.8%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col justify-between space-y-5 text-sm">
          <div className="flex-row items-start space-y-2 text-sm w-full">
            <div className="line-clamp-1 flex gap-2 font-medium text-xs">
              Message decompressed is 100% accurate.
            </div>
            <div className="text-muted-foreground text-xs italic">
              20 Visitors for the last 6 months...
            </div>
          </div>
          <CardAction className="flex-1 justify-center text-center gap-1.5">
            <Button variant="outline" size="sm" asChild>
              <Link href="decrypter">Open Decryption App</Link>
            </Button>
          </CardAction>
        </CardFooter>
      </Card>
    </div>
  );
}
