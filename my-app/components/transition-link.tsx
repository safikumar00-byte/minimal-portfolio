"use client";

import * as React from "react";
import Link from "next/link";

type TransitionLinkProps = React.ComponentProps<typeof Link>;

export default function TransitionLink(props: TransitionLinkProps) {
  return <Link {...props} />;
}
