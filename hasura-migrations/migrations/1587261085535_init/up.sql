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
CREATE TABLE public.items (
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
CREATE TABLE public.items_cats (
    "itemUuid" uuid NOT NULL,
    "catUuid" uuid NOT NULL
);
CREATE TABLE public.items_tags (
    "itemUuid" uuid NOT NULL,
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
CREATE TABLE public.test (
    nr integer NOT NULL,
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL,
    content text NOT NULL
);
CREATE SEQUENCE public.test_nr_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.test_nr_seq OWNED BY public.test.nr;
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
ALTER TABLE ONLY public.test ALTER COLUMN nr SET DEFAULT nextval('public.test_nr_seq'::regclass);
ALTER TABLE ONLY public.items_cats
    ADD CONSTRAINT items_cats_pkey PRIMARY KEY ("itemUuid", "catUuid");
ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (uuid);
ALTER TABLE ONLY public.items_tags
    ADD CONSTRAINT items_tags_pkey PRIMARY KEY ("itemUuid", "tagUuid");
ALTER TABLE ONLY public.cats
    ADD CONSTRAINT cats_pkey PRIMARY KEY (uuid);
ALTER TABLE ONLY public.cats
    ADD CONSTRAINT "cats_slug_userId_key" UNIQUE (slug, "userId");
ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (uuid);
ALTER TABLE ONLY public.tags
    ADD CONSTRAINT "tags_slug_userId_key" UNIQUE (slug, "userId");
ALTER TABLE ONLY public.test
    ADD CONSTRAINT test_id_key UNIQUE (id);
ALTER TABLE ONLY public.test
    ADD CONSTRAINT test_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (uuid);
CREATE TRIGGER set_public_items_updated_at BEFORE UPDATE ON public.items FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_items_updated_at ON public.items IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_cats_updated_at BEFORE UPDATE ON public.cats FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_cats_updated_at ON public.cats IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_tags_updated_at BEFORE UPDATE ON public.tags FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_tags_updated_at ON public.tags IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_users_updated_at ON public.users IS 'trigger to set value of column "updated_at" to current timestamp on row update';
ALTER TABLE ONLY public.items
    ADD CONSTRAINT "items_catUuid_fkey" FOREIGN KEY ("catUuid") REFERENCES public.cats(uuid) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.items_cats
    ADD CONSTRAINT "items_cats_itemUuid_fkey" FOREIGN KEY ("itemUuid") REFERENCES public.items(uuid) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.items_cats
    ADD CONSTRAINT "items_cats_catUuid_fkey" FOREIGN KEY ("catUuid") REFERENCES public.cats(uuid) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.items_tags
    ADD CONSTRAINT "items_tags_itemUuid_fkey" FOREIGN KEY ("itemUuid") REFERENCES public.items(uuid) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.items_tags
    ADD CONSTRAINT "items_tags_tagUuid_fkey" FOREIGN KEY ("tagUuid") REFERENCES public.tags(uuid) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.items
    ADD CONSTRAINT "items_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES public.users(uuid) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.cats
    ADD CONSTRAINT "cats_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES public.users(uuid) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.tags
    ADD CONSTRAINT "tags_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES public.users(uuid) ON UPDATE RESTRICT ON DELETE RESTRICT;
