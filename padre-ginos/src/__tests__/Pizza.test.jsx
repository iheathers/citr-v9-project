import { render, cleanup } from "@testing-library/react";

import { afterEach, expect, test } from "vitest";

afterEach(cleanup);

import Pizza from "../Pizza";

test("alt text renders on Pizza image", () => {
  const name = "My Favourite Pizza";
  const src = "https://picsum.photos/200";

  const screen = render(
    <Pizza name={name} description="some pizza" image={src} />,
  );

  const img = screen.getByRole("img");

screen.debug()

  expect(img.src).toBe(src);
  expect(img.alt).toBe(name);
});

test("to have default image if none is provided", () => {
  const screen = render(<Pizza name="Cool Pizza" description="cool pizza" />);

  screen.debug();

  const img = screen.getByRole("img");
  expect(img.src).not.toBe("");
});
