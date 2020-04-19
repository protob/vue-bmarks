--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2 (Ubuntu 12.2-2.pgdg16.04+1)
-- Dumped by pg_dump version 12.1 (Debian 12.1-1.pgdg90+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: set_current_timestamp_updated_at(); Type: FUNCTION; Schema: public; Owner: -
--

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


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bookmarks; Type: TABLE; Schema: public; Owner: -
--

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


--
-- Name: bookmarks_cats; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.bookmarks_cats (
    "bookmarkUuid" uuid NOT NULL,
    "catUuid" uuid NOT NULL
);


--
-- Name: bookmarks_tags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.bookmarks_tags (
    "bookmarkUuid" uuid NOT NULL,
    "tagUuid" uuid NOT NULL
);


--
-- Name: cats; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cats (
    uuid uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    updated_at timestamp with time zone DEFAULT now(),
    "userUuid" uuid,
    "userId" text
);


--
-- Name: tags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tags (
    uuid uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    "userUuid" uuid NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    "userId" text
);


--
-- Name: test; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.test (
    nr integer NOT NULL,
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL,
    content text NOT NULL
);


--
-- Name: test_nr_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.test_nr_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: test_nr_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.test_nr_seq OWNED BY public.test.nr;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

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


--
-- Name: test nr; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.test ALTER COLUMN nr SET DEFAULT nextval('public.test_nr_seq'::regclass);


--
-- Data for Name: bookmarks; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.bookmarks VALUES ('6370cc14-2d83-4e54-a6e3-bee56f782c6c', '7b913740-33b7-422e-a540-236a327b6b75', 'vue', 'vue', 'https://vuejs.org', '2020-04-09 21:17:50.964745+00', 'The Progressive JavaScript Framework', '0cbd7327-5e96-493e-af59-203da9e0de22', 'auth0|5e8f905fd00e310bfb61f15f');
INSERT INTO public.bookmarks VALUES ('812e9c97-16b6-484f-a6db-bed4bb551759', '7b913740-33b7-422e-a540-236a327b6b75', 'magento', 'magento', 'https://magento.com/', '2020-04-09 21:18:48.95923+00', 'magento', '186270f5-abdf-4459-a088-d8a0a4a0d8a9', 'auth0|5e8f905fd00e310bfb61f15f');
INSERT INTO public.bookmarks VALUES ('e59dee31-ce49-4755-9fa5-4d65c27aa9b8', '7b913740-33b7-422e-a540-236a327b6b75', 'Google fonts', 'Google-fonts', 'https://fonts.google.com/', '2020-04-09 21:19:01.218358+00', 'Google fonts', '04c6af04-ef86-4163-96ce-50745c50d039', 'auth0|5e8f905fd00e310bfb61f15f');
INSERT INTO public.bookmarks VALUES ('923c3cc5-eb3f-4be6-a7c8-41faaffe0124', '7b913740-33b7-422e-a540-236a327b6b75', 'react', 'react', 'https://reactjs.org/', '2020-04-09 21:19:36.603918+00', 'A JavaScript library for building user interfaces', 'a34ae8cc-71da-44c8-a39a-ccd5a88234c4', 'auth0|5e8f905fd00e310bfb61f15f');
INSERT INTO public.bookmarks VALUES ('30eefe5b-457e-4ef3-a188-c8279673a314', '7b913740-33b7-422e-a540-236a327b6b75', 'Angular', 'Angular', 'https://angular.io/', '2020-04-09 21:19:56.74443+00', 'One framework. Mobile & desktop', '642a1a59-9d2a-471b-8ff4-df907c800c2a', 'auth0|5e8f905fd00e310bfb61f15f');
INSERT INTO public.bookmarks VALUES ('d0da5bcf-d959-46f1-9ca8-01ff4f635621', '7b913740-33b7-422e-a540-236a327b6b75', 'PrestaShop', 'PrestaShop', 'https://www.prestashop.com/en', '2020-04-11 14:39:41.682814+00', 'Create and develop your business with PrestaShop', '186270f5-abdf-4459-a088-d8a0a4a0d8a9', 'auth0|5e8f905fd00e310bfb61f15f');


--
-- Data for Name: bookmarks_cats; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.bookmarks_cats VALUES ('6370cc14-2d83-4e54-a6e3-bee56f782c6c', '0cbd7327-5e96-493e-af59-203da9e0de22');
INSERT INTO public.bookmarks_cats VALUES ('812e9c97-16b6-484f-a6db-bed4bb551759', '186270f5-abdf-4459-a088-d8a0a4a0d8a9');
INSERT INTO public.bookmarks_cats VALUES ('e59dee31-ce49-4755-9fa5-4d65c27aa9b8', '04c6af04-ef86-4163-96ce-50745c50d039');
INSERT INTO public.bookmarks_cats VALUES ('923c3cc5-eb3f-4be6-a7c8-41faaffe0124', 'a34ae8cc-71da-44c8-a39a-ccd5a88234c4');
INSERT INTO public.bookmarks_cats VALUES ('30eefe5b-457e-4ef3-a188-c8279673a314', '642a1a59-9d2a-471b-8ff4-df907c800c2a');
INSERT INTO public.bookmarks_cats VALUES ('d0da5bcf-d959-46f1-9ca8-01ff4f635621', '186270f5-abdf-4459-a088-d8a0a4a0d8a9');


--
-- Data for Name: bookmarks_tags; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.bookmarks_tags VALUES ('d0da5bcf-d959-46f1-9ca8-01ff4f635621', 'e84482e7-4d7d-4507-9f10-7ead62a54ca1');


--
-- Data for Name: cats; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.cats VALUES ('0cbd7327-5e96-493e-af59-203da9e0de22', 'vue', 'vue', '2020-04-09 21:16:10.162496+00', '7b913740-33b7-422e-a540-236a327b6b75', 'auth0|5e8f905fd00e310bfb61f15f');
INSERT INTO public.cats VALUES ('642a1a59-9d2a-471b-8ff4-df907c800c2a', 'js', 'js', '2020-04-09 21:16:15.433782+00', '7b913740-33b7-422e-a540-236a327b6b75', 'auth0|5e8f905fd00e310bfb61f15f');
INSERT INTO public.cats VALUES ('a34ae8cc-71da-44c8-a39a-ccd5a88234c4', 'react', 'react', '2020-04-09 21:16:22.694185+00', '7b913740-33b7-422e-a540-236a327b6b75', 'auth0|5e8f905fd00e310bfb61f15f');
INSERT INTO public.cats VALUES ('186270f5-abdf-4459-a088-d8a0a4a0d8a9', 'ecommerce', 'ecommerce', '2020-04-09 21:16:29.000027+00', '7b913740-33b7-422e-a540-236a327b6b75', 'auth0|5e8f905fd00e310bfb61f15f');
INSERT INTO public.cats VALUES ('04c6af04-ef86-4163-96ce-50745c50d039', 'typography', 'typography', '2020-04-09 21:16:36.089092+00', '7b913740-33b7-422e-a540-236a327b6b75', 'auth0|5e8f905fd00e310bfb61f15f');


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.tags VALUES ('06c883db-a9d7-4ee3-a2bd-4d96c43b2029', 'vue', 'vue', '7b913740-33b7-422e-a540-236a327b6b75', '2020-04-09 21:16:57.490107+00', 'auth0|5e8f905fd00e310bfb61f15f');
INSERT INTO public.tags VALUES ('e05ed95f-9f83-4100-876d-ee1122c9559f', 'react', 'react', '7b913740-33b7-422e-a540-236a327b6b75', '2020-04-09 21:17:01.342482+00', 'auth0|5e8f905fd00e310bfb61f15f');
INSERT INTO public.tags VALUES ('39eca18e-fc7b-4a86-a191-a3cdff5b8306', 'webdev', 'webdev', '7b913740-33b7-422e-a540-236a327b6b75', '2020-04-09 21:17:05.95245+00', 'auth0|5e8f905fd00e310bfb61f15f');
INSERT INTO public.tags VALUES ('914f716b-9383-4a51-9016-2b54637d4e39', 'tips', 'tips', '7b913740-33b7-422e-a540-236a327b6b75', '2020-04-09 21:17:12.586953+00', 'auth0|5e8f905fd00e310bfb61f15f');
INSERT INTO public.tags VALUES ('e84482e7-4d7d-4507-9f10-7ead62a54ca1', 'persta', 'persta', '7b913740-33b7-422e-a540-236a327b6b75', '2020-04-11 14:39:41.568946+00', 'auth0|5e8f905fd00e310bfb61f15f');
INSERT INTO public.tags VALUES ('11bfe250-514e-47ef-8c41-44475a172f0b', 'w1', 'w1', '7b913740-33b7-422e-a540-236a327b6b75', '2020-04-18 15:18:26.88118+00', 'auth0|5e8f905fd00e310bfb61f15f');
INSERT INTO public.tags VALUES ('61dd246b-6dcc-49a5-8a7c-ec9230ec2adf', 'w2', 'w2', '7b913740-33b7-422e-a540-236a327b6b75', '2020-04-18 15:18:26.88118+00', 'auth0|5e8f905fd00e310bfb61f15f');


--
-- Data for Name: test; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.test VALUES (1, '560214c4-8c4b-48d2-9517-672f7134d856', 'test name 1', 'test content 1');
INSERT INTO public.test VALUES (2, '0cda9d7f-a7ca-4a6d-a69b-52baf64d90ed', 'test name 2', 'test content 2');
INSERT INTO public.test VALUES (3, 'b97229f1-e73a-45d3-85b9-9b68353de127', 'test name 3', 'test content 3');
INSERT INTO public.test VALUES (4, 'bbb46e3b-f76c-4f38-9ad6-42a861016bd5', 'test name 4', 'test content 4');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES ('7b913740-33b7-422e-a540-236a327b6b75', 'admin', 'auth0|5e8f905fd00e310bfb61f15f', 'admin@hasura.com', 'admin', '2020-04-09 21:15:19.043356+00', 'admin', 'auth0|5e8f905fd00e310bfb61f15f');


--
-- Name: test_nr_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.test_nr_seq', 4, true);


--
-- Name: bookmarks_cats bookmarks_cats_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bookmarks_cats
    ADD CONSTRAINT bookmarks_cats_pkey PRIMARY KEY ("bookmarkUuid", "catUuid");


--
-- Name: bookmarks bookmarks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT bookmarks_pkey PRIMARY KEY (uuid);


--
-- Name: bookmarks_tags bookmarks_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bookmarks_tags
    ADD CONSTRAINT bookmarks_tags_pkey PRIMARY KEY ("bookmarkUuid", "tagUuid");


--
-- Name: cats cats_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cats
    ADD CONSTRAINT cats_pkey PRIMARY KEY (uuid);


--
-- Name: cats cats_slug_userId_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cats
    ADD CONSTRAINT "cats_slug_userId_key" UNIQUE (slug, "userId");


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (uuid);


--
-- Name: tags tags_slug_userId_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT "tags_slug_userId_key" UNIQUE (slug, "userId");


--
-- Name: test test_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.test
    ADD CONSTRAINT test_id_key UNIQUE (id);


--
-- Name: test test_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.test
    ADD CONSTRAINT test_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (uuid);


--
-- Name: bookmarks set_public_bookmarks_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER set_public_bookmarks_updated_at BEFORE UPDATE ON public.bookmarks FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();


--
-- Name: TRIGGER set_public_bookmarks_updated_at ON bookmarks; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TRIGGER set_public_bookmarks_updated_at ON public.bookmarks IS 'trigger to set value of column "updated_at" to current timestamp on row update';


--
-- Name: cats set_public_cats_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER set_public_cats_updated_at BEFORE UPDATE ON public.cats FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();


--
-- Name: TRIGGER set_public_cats_updated_at ON cats; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TRIGGER set_public_cats_updated_at ON public.cats IS 'trigger to set value of column "updated_at" to current timestamp on row update';


--
-- Name: tags set_public_tags_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER set_public_tags_updated_at BEFORE UPDATE ON public.tags FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();


--
-- Name: TRIGGER set_public_tags_updated_at ON tags; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TRIGGER set_public_tags_updated_at ON public.tags IS 'trigger to set value of column "updated_at" to current timestamp on row update';


--
-- Name: users set_public_users_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER set_public_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();


--
-- Name: TRIGGER set_public_users_updated_at ON users; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TRIGGER set_public_users_updated_at ON public.users IS 'trigger to set value of column "updated_at" to current timestamp on row update';


--
-- Name: bookmarks bookmarks_catUuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT "bookmarks_catUuid_fkey" FOREIGN KEY ("catUuid") REFERENCES public.cats(uuid) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: bookmarks_cats bookmarks_cats_bookmarkUuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bookmarks_cats
    ADD CONSTRAINT "bookmarks_cats_bookmarkUuid_fkey" FOREIGN KEY ("bookmarkUuid") REFERENCES public.bookmarks(uuid) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: bookmarks_cats bookmarks_cats_catUuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bookmarks_cats
    ADD CONSTRAINT "bookmarks_cats_catUuid_fkey" FOREIGN KEY ("catUuid") REFERENCES public.cats(uuid) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: bookmarks_tags bookmarks_tags_bookmarkUuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bookmarks_tags
    ADD CONSTRAINT "bookmarks_tags_bookmarkUuid_fkey" FOREIGN KEY ("bookmarkUuid") REFERENCES public.bookmarks(uuid) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: bookmarks_tags bookmarks_tags_tagUuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bookmarks_tags
    ADD CONSTRAINT "bookmarks_tags_tagUuid_fkey" FOREIGN KEY ("tagUuid") REFERENCES public.tags(uuid) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: bookmarks bookmarks_userUuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT "bookmarks_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES public.users(uuid) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: cats cats_userUuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cats
    ADD CONSTRAINT "cats_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES public.users(uuid) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: tags tags_userUuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT "tags_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES public.users(uuid) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

