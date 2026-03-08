import { ImageResponse } from "next/og";
import { AppIcon } from "@/components/AppIcon";

export const contentType = "image/png";

type IconRouteParams = {
  params: Promise<{ size: string }>;
};

export async function GET(request: Request, { params }: IconRouteParams) {
  const { size: sizeParam } = await params;
  const requestedSize = Number(sizeParam);
  const size = Number.isFinite(requestedSize) && requestedSize > 0 ? requestedSize : 512;
  const maskable = new URL(request.url).searchParams.get("maskable") === "1";

  return new ImageResponse(<AppIcon size={size} maskable={maskable} />, {
    width: size,
    height: size,
  });
}
