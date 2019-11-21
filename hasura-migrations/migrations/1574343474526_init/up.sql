CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE TABLE public.bookmarks (
    uuid uuid DEFAULT public.gen_random_uuid() NOT NULL,
    "userUuid" uuid NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    url text NOT NULL,
    updated_at timestamp with time zone DEFAULT now(),
    "desc" text,
    "catUuid" uuid,
    "userId" text
);
CREATE TABLE public.bookmarks_cats (
    "bookmarkUuid" uuid NOT NULL,
    "catUuid" uuid NOT NULL
);
CREATE TABLE public.bookmarks_tags (
    "bookmarkUuid" uuid NOT NULL,
    "tagUuid" uuid NOT NULL
);
CREATE TABLE public.cats (
    uuid uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    updated_at timestamp with time zone DEFAULT now(),
    "userUuid" uuid,
    "userId" text
);
CREATE TABLE public.tags (
    uuid uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    "userUuid" uuid NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    "userId" text
);
CREATE TABLE public.users (
    uuid uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL,
    id text NOT NULL,
    email text NOT NULL,
    slug text NOT NULL,
    updated_at timestamp with time zone DEFAULT now(),
    username text,
    "userId" text NOT NULL
);
ALTER TABLE ONLY public.bookmarks_cats
    ADD CONSTRAINT bookmarks_cats_pkey PRIMARY KEY ("bookmarkUuid", "catUuid");
ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT bookmarks_pkey PRIMARY KEY (uuid);
ALTER TABLE ONLY public.bookmarks_tags
    ADD CONSTRAINT bookmarks_tags_pkey PRIMARY KEY ("bookmarkUuid", "tagUuid");
ALTER TABLE ONLY public.cats
    ADD CONSTRAINT cats_pkey PRIMARY KEY (uuid);
ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (uuid);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (uuid);
CREATE TRIGGER set_public_bookmarks_updated_at BEFORE UPDATE ON public.bookmarks FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_bookmarks_updated_at ON public.bookmarks IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_cats_updated_at BEFORE UPDATE ON public.cats FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_cats_updated_at ON public.cats IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_tags_updated_at BEFORE UPDATE ON public.tags FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_tags_updated_at ON public.tags IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE PROCEDURE public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_users_updated_at ON public.users IS 'trigger to set value of column "updated_at" to current timestamp on row update';
ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT "bookmarks_catUuid_fkey" FOREIGN KEY ("catUuid") REFERENCES public.cats(uuid) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.bookmarks_cats
    ADD CONSTRAINT "bookmarks_cats_bookmarkUuid_fkey" FOREIGN KEY ("bookmarkUuid") REFERENCES public.bookmarks(uuid) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.bookmarks_cats
    ADD CONSTRAINT "bookmarks_cats_catUuid_fkey" FOREIGN KEY ("catUuid") REFERENCES public.cats(uuid) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.bookmarks_tags
    ADD CONSTRAINT "bookmarks_tags_bookmarkUuid_fkey" FOREIGN KEY ("bookmarkUuid") REFERENCES public.bookmarks(uuid) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.bookmarks_tags
    ADD CONSTRAINT "bookmarks_tags_tagUuid_fkey" FOREIGN KEY ("tagUuid") REFERENCES public.tags(uuid) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT "bookmarks_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES public.users(uuid) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.cats
    ADD CONSTRAINT "cats_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES public.users(uuid) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.tags
    ADD CONSTRAINT "tags_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES public.users(uuid) ON UPDATE RESTRICT ON DELETE RESTRICT;
