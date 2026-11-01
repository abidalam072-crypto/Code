import { ButtonLink, PageIntro } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <PageIntro
        eyebrow="404 · A little crumb trail"
        title={
          <>
            This page took
            <br />
            <em>a sweet little detour.</em>
          </>
        }
        description="We couldn’t find that page, but there’s plenty of sweetness waiting for you."
      >
        <ButtonLink href="/">Back to the sweet side</ButtonLink>
      </PageIntro>
    </>
  );
}
