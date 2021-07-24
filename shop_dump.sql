--
-- PostgreSQL database dump
--

-- Dumped from database version 13.0
-- Dumped by pg_dump version 13.0

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name character varying(256) NOT NULL,
    image character varying(256),
    parent_id integer,
    "order" integer
);


ALTER TABLE public.category OWNER TO postgres;

--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.category ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: favourite; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favourite (
    product_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.favourite OWNER TO postgres;

--
-- Name: filter; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.filter (
    id integer NOT NULL,
    name character varying(256) NOT NULL,
    title character varying(255) NOT NULL,
    type integer
);


ALTER TABLE public.filter OWNER TO postgres;

--
-- Name: filter_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.filter_category (
    category_id integer NOT NULL,
    filter_id integer NOT NULL,
    "order" integer
);


ALTER TABLE public.filter_category OWNER TO postgres;

--
-- Name: filter_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.filter ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.filter_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: filter_product_option; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.filter_product_option (
    filter_id integer NOT NULL,
    product_id integer NOT NULL,
    option_id integer NOT NULL
);


ALTER TABLE public.filter_product_option OWNER TO postgres;

--
-- Name: option; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.option (
    id integer NOT NULL,
    value character varying(256),
    filter_id integer NOT NULL
);


ALTER TABLE public.option OWNER TO postgres;

--
-- Name: option_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.option ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.option_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    id integer NOT NULL,
    name character varying(256) NOT NULL,
    price numeric(24,2),
    category_id integer,
    old_price numeric(24,2),
    info text
);


ALTER TABLE public.product OWNER TO postgres;

--
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.product ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: product_image; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_image (
    product_id integer NOT NULL,
    image character varying(256) NOT NULL
);


ALTER TABLE public.product_image OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    email character varying(256),
    password character varying(256),
    role character varying(256),
    first_name character varying(256),
    last_name character varying(256)
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."user" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (id, name, image, parent_id, "order") FROM stdin;
11	CZĘŚCI SAMOCHODOWE	http://192.168.0.108:7777/car-parts.jpg	\N	1
2	OLEJE	/product.jpg	\N	2
1	OPONY	http://192.168.0.108:7777/jak-dobrze-kupic-opony.png	\N	3
4	AUTOKOSMETYKI	/autocosmetics.jpg	\N	4
5	WARSZTAT	/warsztat.jpg	\N	5
18	CAR AUDIO	http://192.168.0.108:7777/subwoofer.png	\N	6
27	PHONE CASE	http://192.168.0.108:7777/redpepper-waterproof-case-iphone-12-kupit-14.1000x.jpg	\N	7
3	OŚWIETLENIE	/light.jpg	11	1
\.


--
-- Data for Name: favourite; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.favourite (product_id, user_id) FROM stdin;
62	3
36	3
43	3
68	3
10	3
18	3
16	3
8	3
1	3
21	3
15	3
7	3
19	3
4	3
11	3
5	3
69	3
20	3
9	3
36	8
4	8
6	3
68	5
3	3
\.


--
-- Data for Name: filter; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.filter (id, name, title, type) FROM stdin;
19	diameter	Średnica	0
6	width	Szerokość	0
23	diameter	Średnica	0
24	power	Moc RMS	0
25	weight	Waga	0
27	iphone	iPhone	0
28	color	Color	0
2	price	Price	1
3	season	Sezon	0
18	profil	Profil	0
\.


--
-- Data for Name: filter_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.filter_category (category_id, filter_id, "order") FROM stdin;
18	23	2
18	24	3
18	25	4
1	3	2
1	18	3
1	19	4
1	6	5
18	2	\N
3	2	\N
2	2	\N
4	2	\N
5	2	\N
27	2	\N
1	2	\N
27	27	\N
27	28	\N
\.


--
-- Data for Name: filter_product_option; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.filter_product_option (filter_id, product_id, option_id) FROM stdin;
23	62	61
24	62	62
25	62	63
28	69	70
27	69	69
27	68	66
28	68	71
3	43	15
6	43	16
18	43	47
19	43	50
3	15	13
19	15	51
6	15	17
18	15	49
3	7	14
6	7	19
18	7	49
19	7	53
3	36	14
6	36	17
18	36	46
19	36	51
3	19	15
6	19	19
18	19	49
19	19	53
3	21	13
6	21	18
18	21	48
19	21	52
3	20	15
6	20	18
18	20	48
19	20	53
\.


--
-- Data for Name: option; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.option (id, value, filter_id) FROM stdin;
66	iPhone 11	27
13	Zimowe	3
14	Całoroczne	3
15	Letnie	3
69	iPhone 12	27
19	235	6
70	Orange	28
71	SnowWhite	28
17	225	6
18	265	6
16	275	6
46	40	18
47	45	18
48	70	18
49	55	18
50	R21	19
51	R19	19
52	R17	19
53	R16	19
61	10	23
62	300 W	24
63	4,26	25
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product (id, name, price, category_id, old_price, info) FROM stdin;
20	SAVA opony	100.00	1	123.00	\N
5	Honiton zestaw kluczy nasadowych z grzechotką 94 elementy H4056	269.99	5	\N	\N
1	Castrol EDGE OIL	43.00	2	\N	Nowy Castrol EDGE to jedyny olej na świecie opracowany w zaawansowanej technologii FST™. Fluid Strength Technology™ to dynamiczny system, który aktywnie wzmacnia olej i zapewnia mu zdolność ciągłego reagowania na potrzeby silnika i dostosowywania się do niego przy każdym stylu jazdy. Zastosowana technologia wydłuża trwałość układów katalitycznych zmniejszających emisję składników toksycznych spalin. Obok właściwości utrzymujących silnik w czystości, EDGE 5W-30 posiada system chroniący silnik przed zużyciem, który zapewnia ochronę nowoczesnych jednostek FSI, TDI i turbodoładowanych silników benzynowych.
69	Apple Leather Case with MagSafe California Poppy	107.00	27	114.00	\N
68	Silicone Case Seafoam	12.99	27	14.00	\N
3	Żarówka samochodowa LED C5W 42mm 12 x 1210 12V	3.85	3	5.99	\N
6	CASTROL EDGE 0W30 A5/B5 TITANIUM FST VOLVO 1L	37.90	2	\N	Nowy Castrol EDGE to jedyny olej na świecie opracowany w zaawansowanej technologii FST™. Fluid Strength Technology™ to dynamiczny system, który aktywnie wzmacnia olej i zapewnia mu zdolność ciągłego reagowania na potrzeby silnika i dostosowywania się do niego przy każdym stylu jazdy. Zastosowana technologia wydłuża trwałość układów katalitycznych zmniejszających emisję składników toksycznych spalin. Obok właściwości utrzymujących silnik w czystości, EDGE 5W-30 posiada system chroniący silnik przed zużyciem, który zapewnia ochronę nowoczesnych jednostek FSI, TDI i turbodoładowanych silników benzynowych. s
43	CONTINENTAL SPORTCONTACT 6 275/45R21 107Y MO	998.99	1	\N	\N
15	Continental WinterContact TS 850 P SUV 225/55R19 99 V FR 	334.00	1	\N	Nowy Castrol EDGE to jedyny olej na świecie opracowany w zaawansowanej technologii FST™. Fluid Strength Technology™ to dynamiczny system, który aktywnie wzmacnia olej i zapewnia mu zdolność ciągłego reagowania na potrzeby silnika i dostosowywania się do niego przy każdym stylu jazdy. Zastosowana technologia wydłuża trwałość układów katalitycznych zmniejszających emisję składników toksycznych spalin. Obok właściwości utrzymujących silnik w czystości, EDGE 5W-30 posiada system chroniący silnik przed zużyciem, który zapewnia ochronę nowoczesnych jednostek FSI, TDI i turbodoładowanych silników benzynowych.
7	Michelin CrossClimate+	546.00	1	\N	\N
36	Michelin Pilot Sport Cup 2 Connect 225/40 R19 93 Y XL, FSL, ZR	1154.00	1	1695.00	\N
19	Michelin Sony VAIO	420.00	1	432.00	\N
21	Nokian Hakkapeliitta LT2 265/70 R17 121/118 Q 	323.00	1	\N	\N
62	Pride Eco 10 300 W	48.38	18	\N	\N
9	ADBL APC 1L	22.91	4	\N	\N
18	Mobil 1 OW-40	12.99	2	27.00	\N
16	Castrol Edge	23.43	2	\N	Nowy Castrol EDGE to jedyny olej na świecie opracowany w zaawansowanej technologii FST™. Fluid Strength Technology™ to dynamiczny system, który aktywnie wzmacnia olej i zapewnia mu zdolność ciągłego reagowania na potrzeby silnika i dostosowywania się do niego przy każdym stylu jazdy. Zastosowana technologia wydłuża trwałość układów katalitycznych zmniejszających emisję składników toksycznych spalin. Obok właściwości utrzymujących silnik w czystości, EDGE 5W-30 posiada system chroniący silnik przed zużyciem, który zapewnia ochronę nowoczesnych jednostek FSI, TDI i turbodoładowanych silników benzynowych.
8	Edge Castrol	124.00	2	\N	Nowy Castrol EDGE to jedyny olej na świecie opracowany w zaawansowanej technologii FST™. Fluid Strength Technology™ to dynamiczny system, który aktywnie wzmacnia olej i zapewnia mu zdolność ciągłego reagowania na potrzeby silnika i dostosowywania się do niego przy każdym stylu jazdy. Zastosowana technologia wydłuża trwałość układów katalitycznych zmniejszających emisję składników toksycznych spalin. Obok właściwości utrzymujących silnik w czystości, EDGE 5W-30 posiada system chroniący silnik przed zużyciem, który zapewnia ochronę nowoczesnych jednostek FSI, TDI i turbodoładowanych silników benzynowych.
10	Żarówka samochodwa H4 Philips Vision	11.00	3	\N	\N
4	Shiny Garage zestaw kosmetyków na dobry początek	160.90	4	\N	\N
11	Zestaw narzędzi BOSCH V-Line Titanium 	129.00	5	169.00	\N
\.


--
-- Data for Name: product_image; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_image (product_id, image) FROM stdin;
18	http://192.168.0.108:7777/mobil-1-new-life-0w-40-il.jpg
10	http://192.168.0.108:7777/zarowka-h4-philips-premium-p43t-12v-6055w-philips.jpg
4	http://192.168.0.108:7777/cosmetics.png
16	http://192.168.0.108:7777/product.jpg
11	http://192.168.0.108:7777/Zestaw-narzedzi-BOSCH-V-Line-Titanium-wyposazenie.jpg
8	http://192.168.0.108:7777/product.jpg
6	http://192.168.0.108:7777/product.jpg
3	http://192.168.0.108:7777/light-led.png
43	http://192.168.0.108:7777/opona-letnia-continental-sportcontact-6-275-45r21-107y-mo--2203908.jpg
15	http://192.168.0.108:7777/wheel.png
7	http://192.168.0.108:7777/IMG_4880.JPG
36	http://192.168.0.108:7777/michelin-pilot-sport-cup-2-connect-21238-f-f-l700-sk4.png
19	http://192.168.0.108:7777/IMG_4880.JPG
21	http://192.168.0.108:7777/nokian-hakkapeliitta-lt2-8736-f-f-l700-sk4.png
20	http://192.168.0.108:7777/image.jpg
69	http://192.168.0.108:7777/apple-lather-leather-case-with-magsafe-california-poppy-mhkc3-iphone-12-12-pro-3.1000x1000.jpg
69	http://192.168.0.108:7777/apple-lather-leather-case-with-magsafe-california-poppy-mhkc3-iphone-12-12-pro-2.1000x1000.jpg
69	http://192.168.0.108:7777/apple-lather-leather-case-with-magsafe-california-poppy-mhkc3-iphone-12-12-pro-1.1000x.jpg
68	http://192.168.0.108:7777/onelounge-silicone-case-seafoam-iphone-11-oem.1000x.jpg
68	http://192.168.0.108:7777/onelounge-silicone-case-seafoam-iphone-11-oem-1.1000x1000.jpg
5	http://192.168.0.108:7777/set-of-keys.jpg
9	http://192.168.0.108:7777/adbl-apc-1l.jpg
1	http://192.168.0.108:7777/product.jpg
62	http://192.168.0.108:7777/4ae1db3071635e929452c40d7680a61e.jpg
62	http://192.168.0.108:7777/0c05f8966fad631478e00e9df10963ca.jpg
62	http://192.168.0.108:7777/f31b8bb256299267ca3dd86a5dd14aa8.jpg
62	http://192.168.0.108:7777/0bfa7a2fdacf8618190f467e16d98742.jpg
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, email, password, role, first_name, last_name) FROM stdin;
5	taras1808@gmail.com	12345	user	Taras	Kulyavets
3	user@user	user	user	\N	\N
7	andriy@gmail.com	12345	user	Andriy	Kulyavets
2	admin@admin	admin	admin	Admin	Admin
8	test@gmail.com	12345	user	Test 1	Test 2
\.


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_id_seq', 29, true);


--
-- Name: filter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.filter_id_seq', 28, true);


--
-- Name: option_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.option_id_seq', 72, true);


--
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_id_seq', 70, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 8, true);


--
-- Name: category category_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pk PRIMARY KEY (id);


--
-- Name: favourite favourite_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favourite
    ADD CONSTRAINT favourite_pkey PRIMARY KEY (product_id, user_id);


--
-- Name: filter_category filter_category_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.filter_category
    ADD CONSTRAINT filter_category_pk PRIMARY KEY (category_id, filter_id);


--
-- Name: filter filter_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.filter
    ADD CONSTRAINT filter_pk PRIMARY KEY (id);


--
-- Name: filter_product_option filter_product_option_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.filter_product_option
    ADD CONSTRAINT filter_product_option_pk PRIMARY KEY (filter_id, product_id);


--
-- Name: option option_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.option
    ADD CONSTRAINT option_pk PRIMARY KEY (id);


--
-- Name: product_image pk_product_image; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_image
    ADD CONSTRAINT pk_product_image PRIMARY KEY (product_id, image);


--
-- Name: product product_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pk PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: fki_category_category; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_category_category ON public.category USING btree (parent_id);


--
-- Name: fki_filter_option_FK; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "fki_filter_option_FK" ON public.option USING btree (filter_id);


--
-- Name: fki_fk_product_image; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_fk_product_image ON public.product_image USING btree (product_id);


--
-- Name: fki_product_category; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_product_category ON public.product USING btree (category_id);


--
-- Name: fki_table_6_filter; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_table_6_filter ON public.filter_category USING btree (filter_id);


--
-- Name: fki_table_8_option; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_table_8_option ON public.filter_product_option USING btree (option_id);


--
-- Name: fki_table_8_product; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_table_8_product ON public.filter_product_option USING btree (filter_id);


--
-- Name: category category_category; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_category FOREIGN KEY (parent_id) REFERENCES public.category(id) ON DELETE SET NULL;


--
-- Name: option filter_table; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.option
    ADD CONSTRAINT filter_table FOREIGN KEY (filter_id) REFERENCES public.filter(id) ON DELETE CASCADE;


--
-- Name: product_image fk_product_image; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_image
    ADD CONSTRAINT fk_product_image FOREIGN KEY (product_id) REFERENCES public.product(id) ON DELETE CASCADE;


--
-- Name: favourite prod; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favourite
    ADD CONSTRAINT prod FOREIGN KEY (product_id) REFERENCES public.product(id) ON DELETE CASCADE;


--
-- Name: product product_category; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_category FOREIGN KEY (category_id) REFERENCES public.category(id) ON DELETE SET NULL;


--
-- Name: filter_category table_6_category; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.filter_category
    ADD CONSTRAINT table_6_category FOREIGN KEY (category_id) REFERENCES public.category(id);


--
-- Name: filter_category table_6_filter; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.filter_category
    ADD CONSTRAINT table_6_filter FOREIGN KEY (filter_id) REFERENCES public.filter(id) ON DELETE CASCADE;


--
-- Name: filter_product_option table_8_filter; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.filter_product_option
    ADD CONSTRAINT table_8_filter FOREIGN KEY (filter_id) REFERENCES public.filter(id) ON DELETE CASCADE;


--
-- Name: filter_product_option table_8_option; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.filter_product_option
    ADD CONSTRAINT table_8_option FOREIGN KEY (option_id) REFERENCES public.option(id) ON DELETE CASCADE;


--
-- Name: filter_product_option table_8_product; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.filter_product_option
    ADD CONSTRAINT table_8_product FOREIGN KEY (product_id) REFERENCES public.product(id) ON DELETE CASCADE;


--
-- Name: favourite usr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favourite
    ADD CONSTRAINT usr FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON SCHEMA public TO administrator;


--
-- Name: TABLE category; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.category TO administrator;


--
-- Name: TABLE favourite; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.favourite TO administrator;


--
-- Name: TABLE filter; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.filter TO administrator;


--
-- Name: TABLE filter_category; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.filter_category TO administrator;


--
-- Name: TABLE filter_product_option; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.filter_product_option TO administrator;


--
-- Name: TABLE option; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.option TO administrator;


--
-- Name: TABLE product; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.product TO administrator;


--
-- Name: TABLE product_image; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.product_image TO administrator;


--
-- Name: TABLE "user"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."user" TO administrator;


--
-- PostgreSQL database dump complete
--

