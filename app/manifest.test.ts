import { describe, expect, it } from "vitest";
import manifest from "@/app/manifest";

describe("manifest", () => {
  it("defines an installable standalone web app", () => {
    const config = manifest();

    expect(config.display).toBe("standalone");
    expect(config.start_url).toBe("/");
    expect(config.icons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ src: "/icons/192", sizes: "192x192" }),
        expect.objectContaining({ src: "/icons/512", sizes: "512x512" }),
      ]),
    );
  });
});
