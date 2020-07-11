--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3 (Debian 12.3-1.pgdg100+1)
-- Dumped by pg_dump version 12.2

-- Started on 2020-07-11 14:14:03 UTC

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
-- TOC entry 5 (class 2615 OID 16453)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 207 (class 1259 OID 16482)
-- Name: drafts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.drafts (
    id integer NOT NULL,
    "messageId" character varying NOT NULL,
    "to" character varying,
    content character varying NOT NULL,
    "timestamp" character varying NOT NULL,
    "userId" integer
);


ALTER TABLE public.drafts OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 16480)
-- Name: drafts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.drafts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.drafts_id_seq OWNER TO postgres;

--
-- TOC entry 2962 (class 0 OID 0)
-- Dependencies: 206
-- Name: drafts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.drafts_id_seq OWNED BY public.drafts.id;


--
-- TOC entry 203 (class 1259 OID 16456)
-- Name: inbox; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inbox (
    id integer NOT NULL,
    "messageId" character varying NOT NULL,
    "from" character varying NOT NULL,
    content character varying NOT NULL,
    "timestamp" character varying NOT NULL,
    "isRead" boolean NOT NULL,
    "isStarred" boolean NOT NULL,
    "isDeleted" boolean NOT NULL,
    "userId" integer
);


ALTER TABLE public.inbox OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16454)
-- Name: inbox_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inbox_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.inbox_id_seq OWNER TO postgres;

--
-- TOC entry 2963 (class 0 OID 0)
-- Dependencies: 202
-- Name: inbox_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inbox_id_seq OWNED BY public.inbox.id;


--
-- TOC entry 205 (class 1259 OID 16469)
-- Name: sent; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sent (
    id integer NOT NULL,
    "messageId" character varying NOT NULL,
    "to" character varying NOT NULL,
    content character varying NOT NULL,
    "timestamp" character varying NOT NULL,
    "isStarred" boolean NOT NULL,
    "isDeleted" boolean NOT NULL,
    "userId" integer
);


ALTER TABLE public.sent OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16467)
-- Name: sent_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sent_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sent_id_seq OWNER TO postgres;

--
-- TOC entry 2964 (class 0 OID 0)
-- Dependencies: 204
-- Name: sent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sent_id_seq OWNED BY public.sent.id;


--
-- TOC entry 209 (class 1259 OID 16495)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying(64) NOT NULL,
    password character varying NOT NULL,
    name character varying(64) NOT NULL,
    surname character varying(64) NOT NULL,
    theme character varying NOT NULL,
    "keepMeLoggedIn" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 16493)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- TOC entry 2965 (class 0 OID 0)
-- Dependencies: 208
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- TOC entry 2801 (class 2604 OID 16485)
-- Name: drafts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.drafts ALTER COLUMN id SET DEFAULT nextval('public.drafts_id_seq'::regclass);


--
-- TOC entry 2799 (class 2604 OID 16459)
-- Name: inbox id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inbox ALTER COLUMN id SET DEFAULT nextval('public.inbox_id_seq'::regclass);


--
-- TOC entry 2800 (class 2604 OID 16472)
-- Name: sent id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sent ALTER COLUMN id SET DEFAULT nextval('public.sent_id_seq'::regclass);


--
-- TOC entry 2802 (class 2604 OID 16498)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 2954 (class 0 OID 16482)
-- Dependencies: 207
-- Data for Name: drafts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.drafts (id, "messageId", "to", content, "timestamp", "userId") VALUES (2, '982a0bdf-7b3d-4114-910c-d567675a6e6c', NULL, 'WhVo8r93wmbFjG9MDwDVqb3QS1HgEbXob3TTrauVnuGsEzs3kJxC0wT+kaUA0Bp81OaX3K0qeD9iZ1IKstqSb+ivi6jqKzCEohabmx5PlHPSflHj3L21lJz2rpbIjztC', '1594475338437', 3);
INSERT INTO public.drafts (id, "messageId", "to", content, "timestamp", "userId") VALUES (3, '7d207bff-3be5-4dc5-b1a6-a8b003620d42', NULL, 'WhVo8r93wmbFjG9MDwDR+uqREkN6SwdUS4zDymfH617krijcXx+HcjDr/nBlUEBicKXXzCVWeyoOC8K7J3QJ3AQtCAzgJDEce2LL6lIGyitdZycWgBRj2dglW+XC7lGqzjUHvRNEcx55Wfs4NDwOhpx1u0/5AsrATfprZFLhB7HVL6aE6AbYg0jG4LZDKl5JZrfvsVyCO5I++EdMi/Fht22+2dAqnpuXeixM9zA3TczKSSs1gPuiHOg5NQ/ObUL9qaANIuqvS1/PVACQBJym+2YMDPmpjyzWC6djKN4TtCjjFGZ811Jjlz3c30ilkpBbxslxbb8WIMvS8pWJyad+10+m6/LQdk7g+UuqzCxCtQY1Y8rl+xggD925T8yQ09rDvYUC9+OX3Lx/twV3EEK3lAhCGtZ+TWbEs60kzgiEekYrbNjRBINW6Uy/RbZJt4sKtNCEzMwbnzpF5ikO6Xs25MtI7F8m+C40V4+o70jrTGyfWZd69Me9hWdMkQY=', '1594475407350', 3);


--
-- TOC entry 2950 (class 0 OID 16456)
-- Dependencies: 203
-- Data for Name: inbox; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.inbox (id, "messageId", "from", content, "timestamp", "isRead", "isStarred", "isDeleted", "userId") VALUES (2, '397c216d-7bd3-4d02-af0a-809a734d3485', 'lorem.ipsum@post.ar', 'WhVo8r8rw2zBjDVMCwHRqoJlO1U3/AkIliWls6pA1lnfnhDY58ZqSve6cVBo1N07+shBXAtLoxzAx9Lgc/6yaPbXrxKzOsYhf8IqyD+bK4n9RTBXH3F7pTPC+G2ZfSWFJkAJ2bM1E32t5GRZYnsYK2sSZgej1LgpdlyccDyy3bN+22sG3byuqoxbRdDS4P2sBL27VjYKeSPR1LgjL8VBMX1G4XftydsrBEsrmewU76tCkl9Os36JVO5wui/MqXogZR2kodtW9Oe8Tgcd1uNYvGykURk3E2zX4iM9GRqmQ+4+vLCts9onQ+CxdX1IXiNWKT6YhT2R+J2BpOmfIhGHjPbd2WeJorGwWWV/JxP2nDvCuYFbes7wjd8uShHBRQk30EJgybJF1Oi08Gcev4TUlmJUx5MLK9nruJsIFb28j9LvaRgmlP5ZFj1hdqTH1yuYwstp1dfswSm/9hDsoOCWCfwP/zQAEmrF0NQhIh0ML8wGxlAZOb3VKHXD7bTiql1MtlWTlaVYDoNBTTmfoWqmJbQVIcUc8lnYjsCLJZxTX5jVUC/pJ0OnNpVtOFUe4P3C/EHlZfVodqk26zMPbh2FGR8OjWNlmHklx887rmJf/Vo3knDWs7QqMxf0', '1594475306503', false, false, true, 2);
INSERT INTO public.inbox (id, "messageId", "from", content, "timestamp", "isRead", "isStarred", "isDeleted", "userId") VALUES (3, 'f2a38e5c-57b9-4ad8-a8dc-147cbe90d6f6', 'jane.doe@post.ar', 'WhVo8r8rw2zBjDVMCwHRqoJlO1U3/AkIyXCn5K9C1g5tDU6HHR2g9UYA/Jus010OJ5PtDNxkCHhduuEYT414bTEyryXX6E1feK42GRSg1ox5biKUTKAVmD34N1eRBJlIg0VhGqQAvBeTJfoHzwmTHOUPvFgBwosoIDOBaJNZ3x3hPQUOBnbJbLb3+J9KXrrEakeyaF1JHCffx7Py6WIjfIbG+gF/KUNLGgYkMU09BgO4/u261MR7WvMx', '1594475641711', true, false, false, 3);
INSERT INTO public.inbox (id, "messageId", "from", content, "timestamp", "isRead", "isStarred", "isDeleted", "userId") VALUES (4, 'cc3e7b30-cbff-433e-a12a-1dfd1b585a2b', 'john.doe@post.ar', 'WhVo8r8rw2zBjDVMCwHRqoJlO1U3/AkIlnGh56sQ1gth+WrD3XuioaJA/I/RmurrBd5QMxYLasYLo9b87ywIK6kjwPzw5/C1Iz9TVdXgr0j4GnFCI9NzjQ2iRDne4tLrv+1ksji3SJ61vDzKt1eSR+SCgv2x7yZVCc3viETF/Gw9xaZF/B70k5l4MMHnPkc5OuN26MWQAcC8SI16841Xlaf9OjSSNvdS2/F86KP++MLvgEpbvoDAKzGmcIVtPpCsvqspq7O4x5e83LHesMRQdu6pY9Aq+adicEomYs817uPp+O1Dlsygtp3asI1NKA3NBqik8IbNFzvs+b8mFQORnSVFT0iImlZ6nCgSY1gng3h3ox6DBJwX48p5LCpVOEpEgOMGxWOE22DJMnBMLQLCilg9IfmDRhw0nCtoq4wZnB5VKYiSwBOrkTqWv3/JeOtKom1EJcWTzim2sssdQsxf5PL5qp9zy3LegljLOSAUGtkRabBJKxtZmw+jZrcqP8jJjNnNjQ==', '1594475843075', true, false, false, 2);
INSERT INTO public.inbox (id, "messageId", "from", content, "timestamp", "isRead", "isStarred", "isDeleted", "userId") VALUES (5, '177ce325-d89d-4adb-bbae-df4d31156bb2', 'lorem.ipsum@post.ar', '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', '1594476099531', true, false, false, 2);
INSERT INTO public.inbox (id, "messageId", "from", content, "timestamp", "isRead", "isStarred", "isDeleted", "userId") VALUES (1, '024f552d-8234-4e25-828f-82b64bd725e8', 'lorem.ipsum@post.ar', 'WhVo8r8rw2zBjDVMCwHRqoJlO1U3/AkIliWls6pA1lnfnhDY58ZqSve6cVBo1N07+shBXAtLoxzAx9Lgc/6yaPbXrxKzOsYhf8IqyD+bK4n9RTBXH3F7pTPC+G2ZfSWFJkAJ2bM1E32t5GRZYnsYK2sSZgej1LgpdlyccDyy3bN+22sG3byuqoxbRdDS4P2sBL27VjYKeSPR1LgjL8VBMX1G4XftydsrBEsrmewU76tCkl9Os36JVO5wui/MqXogZR2kodtW9Oe8Tgcd1uNYvGykURk3E2zX4iM9GRqmQ+4+vLCts9onQ+CxdX1IXiNWKT6YhT2R+J2BpOmfIhGHjPbd2WeJorGwWWV/JxP2nDvCuYFbes7wjd8uShHBRQk30EJgybJF1Oi08Gcev4TUlmJUx5MLK9nruJsIFb28j9LvaRgmlP5ZFj1hdqTH1yuYwstp1dfswSm/9hDsoOCWCfwP/zQAEmrF0NQhIh0ML8wGxlAZOb3VKHXD7bTiql1MtlWTlaVYDoNBTTmfoWqmJbQVIcUc8lnYjsCLJZxTX5jVUC/pJ0OnNpVtOFUe4P3C/EHlZfVodqk26zMPbh2FGR8OjWNlmHklx887rmJf/Vo3knDWs7QqMxf0', '1594475282239', false, false, true, 1);
INSERT INTO public.inbox (id, "messageId", "from", content, "timestamp", "isRead", "isStarred", "isDeleted", "userId") VALUES (6, 'cf5799a9-09cc-4791-a424-7b880a6087ff', 'jane.doe@post.ar', 'WhVo8r8rw2zBjDVMCwHRqoJlO1U3/AkIlXKl4K4T0l7smLpsUvFkM9MmYM6pWcHBoSn2Fm7E3Ly4whFEcZLY5kv5+qTIwk6IVsVmY9QB5qNAzFyNGTrVW60tkL4BxcKtmXASanW2wCOGD1riSU0uQUl+FYaeXydJ7aMDY6PuaEPQS4zeeqFseJBzp+OCTGfehoTnABc02oruDypcuhkgFccrH0/57HOi8/wOl/8UdHIy0J6rhxe5ZcvYvI3nSsOVQjIlng6OKJleh869jgGVzh6X2hVSncq39+6PYUD5m0kOzw8jLh9dRXd2aKGyrTvoKvv9btC47ytO0xF7I6iryI1g4Zlx2cwtS+l1wcEsYWXkQFxQgAa2p8r5BBLPJrS+WfUgiW3SGMN8j8ocfMkknz1b/J2uxJ78m2I91xdwEqH9QasZRzLxcvJa0f0iGz6ZmkJf44ZYZgy5JdatTCeLxupyYySC8y4eavyn3dwoC7rFiFytXXUWtd6GGZf+clwAKhbqw0uI36Mj7dt9soFB33bZIbvsf15ABROH1cXr9/Xv4zbzJRfo9XDuzzSt1VAkcd+CmjQuBBGcS9BRjwnkDwCoW65hNrvwNorGdGD3QXoke54aT9CX0BSAyBvxH7l5b9XwDbZlfuGMVeOBtl0mtfou7xt5o7L1zeEi83rN/fJL3yjGToBbDvxDbdwJj+9PZtpDZUe+9K0cVBaws1GpfdY5g6eT4BRK7aqJTZITjdz4oFlTqmwwcCB0vuwP+qAa/haAQXarU9z70+4XyWC8c/yPDvDIuf4eOJZPT9LXZwigoFPMr+dmwhoPKHEDOIgZ7sz2TrQkXovO/l4SCBzxMPNnGmIutb8gCSROfpmuBOdeaGTTYz8ll7sREKzL7o6lHPPZCYL0hXSadwouLdESoapjyzNDxb80f9tf6zxjYe+nQhgs+vWuxUtpE0rY6N2eahYAzfV4tlvycuXZsfnNPGxX13y7ftJeI7Wgs9aUw5o6D2ydUMAGWKzhCBdviodNvXf2HKUI2NsRpVC7W0piuXx9YzfWVazLyvPiwPoSpMyJWRfMapxbBeswwyjTsYmLp+dxlXxhXPeXlogCtZlm1GKaRQRZGS3J5AHz4h7APC4sITJrAXcd4GQWz5hffccY8ByaoInx1SjXS/T/oSPtsq1q49PNhdFpH0o=', '1594476342037', true, false, false, 1);
INSERT INTO public.inbox (id, "messageId", "from", content, "timestamp", "isRead", "isStarred", "isDeleted", "userId") VALUES (7, '30b63781-8c3e-4b74-85b9-1f785d1ceb48', 'john.doe@post.ar', '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', '1594476430058', true, false, false, 2);
INSERT INTO public.inbox (id, "messageId", "from", content, "timestamp", "isRead", "isStarred", "isDeleted", "userId") VALUES (8, 'abd5c002-df52-4eca-a43b-e07c0179e63f', 'jane.doe@post.ar', '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', '1594476475554', false, false, false, 1);
INSERT INTO public.inbox (id, "messageId", "from", content, "timestamp", "isRead", "isStarred", "isDeleted", "userId") VALUES (9, '1f7e5688-a2ae-4dda-9891-80cb61e39fc4', 'lorem.ipsum@post.ar', 'WhVo8r8rw2zBjDVMCwHRqoJlO1U3/AkIlnGh56pA1llokDkqplzCMIvUgMX98yqMjXv4h3owCE5c/l6LIlOqmZnUauEWxNCku6gPpE/wXjuqAmqFZPmj6jtrsMjyHXpNIQoyZq6Iw9VqtDhQGoIeM6gX8mleXg0OeItkcvmJLtBoVM1TkVp8jCHUkoiEdXw8FGQBIKg+F1nULvlIeChPA8zbRmwV94dXSe0m/D4SZYHfT2UTE+FS53AkJKBKmdqdVRXLCxQRBxreiplCLcaVJ4h9kGe31VLy6dlByNFwWlLI+q3WSC+RhwJHM8y7GIV0T6CaPRLwM0ahJXu/pF7Evc1U7FWQRwLzCWJ+H1m6X22FTYO3VAyduDwSHt0s0E6PX/rUkJjzPztBSiWo4mEZR/1VF8A9QiJYRTRqQJwdbQPZ8vXGJFp4v1uzMcVbVb50MUC/nOFWZnf5E3MdqoCa+2yfhkNqA6pZVaNyACLLdejd4oYkbULe+yGHqPaHm0PEx4NTr+xZygyKDL1S7TsR7qAxKANCFu12RAINIpq+MXLNmaP+0dcyy5YnVFcGy1PjLIQJSwT6rxBOcADIEU0zuaAWuSvxKDWZBAcQJEV1zxHEfxoZn6y5S8raC+xw4HsZGN1oyVLjVeunXVH/2QsFhG/kKkvgZcv8rJUjsr7CSCSARHha9kjzM1nXeyqrerqTCEtiFmpVpwoRTXPDkp36kYRft5g3pYvLaO8TWVjEo+I/12R0lQz2J+NdiedfrnMw3CvYqXi/ykDP71SAv0gpRka6e9VGwIOdKcUUJwEDCJ2JbsoIZdZoIjYxAFfOKbu9qcDXUn/nHddv/y87DfsaCSWvXX+gbceQy6tf7HrWs9vS9KxoWH3Cp3/bzf1ACGtghe2sLi5NcIFl3hEkb+/5OL7/SKwuIVm0x5wLJILn438ys/QLCsctqKM1EQt0+LBHYQzUQuuK/n1XGaKexj6IjiH+Aa6pi0hpkxgl0JbG0gdmKrjHvamaC0G2pE48Rj7pydIwO/nPp6V3F89mZY8SwMZ+1yPt/8JOr60Ahtq5ZwQ6OXM9btgrGYR1ylj7uV1LYi7Ljw06Kw+QyE9WFfuPs2k25YqE7739QYA/u2YtgL/68icolgeQNQfAomxZbHZrmYjgq9r5/v/QoCMhR3Az65QrRUBL8K2VPcfSIfnpufLpzb655teaR1AHe35pWmvVzGD6xo10biq6IwXg6dYwcbHmDhv9a482ItIlrFvf6MWZQphVZF55ODkBlxBuJspku0pwk7g6fWD4ToqZqrvxK/2Rol6mZh510LIQv1tl9Jf5jJjGPaSDGPmHJHPFnDexsJ0myPyxc4sgK/rvxjWSzkus/LHMRUnqiUqbgdznpV7r+1ppqhSdmRjbh2nIEsh2wD0lUMmHCGCAFjbLJ95EHjm6i3ILZVBRN+PRiDSFFNQdFGnHzGANa7oUDTp9n3QQJ5qu+8zWYSWt265yGuziF0+Os6G28aYWVXdzIxIXs8Ct6+uv+UqkAn2pbKCJVRaIwETSwlYKvP3mlMv7witx0aF8sOp3FpKFfUfiKL/e0kmoFx5RJwb7It9EOevitAcD81NSqFl/F/bIRyTtj6JdaS76o+2XMQQDLWiX5NBXTSEROJD0+ceS9usIA3AzOHu94J3n1/+yVNUoFyHCir1G4RaHAS3XRsFF0hZ4UTDCJVM4lbH3IDtfNqrXU4qm+iA1kkrvrpF/Nexe8OydIetaKlAuxJVtnhMV2GM09ee+', '1594476615546', false, false, false, 2);


--
-- TOC entry 2952 (class 0 OID 16469)
-- Dependencies: 205
-- Data for Name: sent; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.sent (id, "messageId", "to", content, "timestamp", "isStarred", "isDeleted", "userId") VALUES (1, '024f552d-8234-4e25-828f-82b64bd725e8', 'john.doe@post.ar', 'WhVo8r8rw2zBjDVMCwHRqoJlO1U3/AkIliWls6pA1lnfnhDY58ZqSve6cVBo1N07+shBXAtLoxzAx9Lgc/6yaPbXrxKzOsYhf8IqyD+bK4n9RTBXH3F7pTPC+G2ZfSWFJkAJ2bM1E32t5GRZYnsYK2sSZgej1LgpdlyccDyy3bN+22sG3byuqoxbRdDS4P2sBL27VjYKeSPR1LgjL8VBMX1G4XftydsrBEsrmewU76tCkl9Os36JVO5wui/MqXogZR2kodtW9Oe8Tgcd1uNYvGykURk3E2zX4iM9GRqmQ+4+vLCts9onQ+CxdX1IXiNWKT6YhT2R+J2BpOmfIhGHjPbd2WeJorGwWWV/JxP2nDvCuYFbes7wjd8uShHBRQk30EJgybJF1Oi08Gcev4TUlmJUx5MLK9nruJsIFb28j9LvaRgmlP5ZFj1hdqTH1yuYwstp1dfswSm/9hDsoOCWCfwP/zQAEmrF0NQhIh0ML8wGxlAZOb3VKHXD7bTiql1MtlWTlaVYDoNBTTmfoWqmJbQVIcUc8lnYjsCLJZxTX5jVUC/pJ0OnNpVtOFUe4P3C/EHlZfVodqk26zMPbh2FGR8OjWNlmHklx887rmJf/Vo3knDWs7QqMxf0', '1594475282239', false, false, 3);
INSERT INTO public.sent (id, "messageId", "to", content, "timestamp", "isStarred", "isDeleted", "userId") VALUES (2, '397c216d-7bd3-4d02-af0a-809a734d3485', 'jane.doe@post.ar', 'WhVo8r8rw2zBjDVMCwHRqoJlO1U3/AkIliWls6pA1lnfnhDY58ZqSve6cVBo1N07+shBXAtLoxzAx9Lgc/6yaPbXrxKzOsYhf8IqyD+bK4n9RTBXH3F7pTPC+G2ZfSWFJkAJ2bM1E32t5GRZYnsYK2sSZgej1LgpdlyccDyy3bN+22sG3byuqoxbRdDS4P2sBL27VjYKeSPR1LgjL8VBMX1G4XftydsrBEsrmewU76tCkl9Os36JVO5wui/MqXogZR2kodtW9Oe8Tgcd1uNYvGykURk3E2zX4iM9GRqmQ+4+vLCts9onQ+CxdX1IXiNWKT6YhT2R+J2BpOmfIhGHjPbd2WeJorGwWWV/JxP2nDvCuYFbes7wjd8uShHBRQk30EJgybJF1Oi08Gcev4TUlmJUx5MLK9nruJsIFb28j9LvaRgmlP5ZFj1hdqTH1yuYwstp1dfswSm/9hDsoOCWCfwP/zQAEmrF0NQhIh0ML8wGxlAZOb3VKHXD7bTiql1MtlWTlaVYDoNBTTmfoWqmJbQVIcUc8lnYjsCLJZxTX5jVUC/pJ0OnNpVtOFUe4P3C/EHlZfVodqk26zMPbh2FGR8OjWNlmHklx887rmJf/Vo3knDWs7QqMxf0', '1594475306503', true, false, 3);
INSERT INTO public.sent (id, "messageId", "to", content, "timestamp", "isStarred", "isDeleted", "userId") VALUES (3, 'f2a38e5c-57b9-4ad8-a8dc-147cbe90d6f6', 'lorem.ipsum@post.ar', 'WhVo8r8rw2zBjDVMCwHRqoJlO1U3/AkIyXCn5K9C1g5tDU6HHR2g9UYA/Jus010OJ5PtDNxkCHhduuEYT414bTEyryXX6E1feK42GRSg1ox5biKUTKAVmD34N1eRBJlIg0VhGqQAvBeTJfoHzwmTHOUPvFgBwosoIDOBaJNZ3x3hPQUOBnbJbLb3+J9KXrrEakeyaF1JHCffx7Py6WIjfIbG+gF/KUNLGgYkMU09BgO4/u261MR7WvMx', '1594475641711', false, false, 2);
INSERT INTO public.sent (id, "messageId", "to", content, "timestamp", "isStarred", "isDeleted", "userId") VALUES (4, 'cc3e7b30-cbff-433e-a12a-1dfd1b585a2b', 'jane.doe@post.ar', 'WhVo8r8rw2zBjDVMCwHRqoJlO1U3/AkIlnGh56sQ1gth+WrD3XuioaJA/I/RmurrBd5QMxYLasYLo9b87ywIK6kjwPzw5/C1Iz9TVdXgr0j4GnFCI9NzjQ2iRDne4tLrv+1ksji3SJ61vDzKt1eSR+SCgv2x7yZVCc3viETF/Gw9xaZF/B70k5l4MMHnPkc5OuN26MWQAcC8SI16841Xlaf9OjSSNvdS2/F86KP++MLvgEpbvoDAKzGmcIVtPpCsvqspq7O4x5e83LHesMRQdu6pY9Aq+adicEomYs817uPp+O1Dlsygtp3asI1NKA3NBqik8IbNFzvs+b8mFQORnSVFT0iImlZ6nCgSY1gng3h3ox6DBJwX48p5LCpVOEpEgOMGxWOE22DJMnBMLQLCilg9IfmDRhw0nCtoq4wZnB5VKYiSwBOrkTqWv3/JeOtKom1EJcWTzim2sssdQsxf5PL5qp9zy3LegljLOSAUGtkRabBJKxtZmw+jZrcqP8jJjNnNjQ==', '1594475843075', false, false, 1);
INSERT INTO public.sent (id, "messageId", "to", content, "timestamp", "isStarred", "isDeleted", "userId") VALUES (5, '177ce325-d89d-4adb-bbae-df4d31156bb2', 'jane.doe@post.ar', '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', '1594476099531', false, false, 3);
INSERT INTO public.sent (id, "messageId", "to", content, "timestamp", "isStarred", "isDeleted", "userId") VALUES (6, 'cf5799a9-09cc-4791-a424-7b880a6087ff', 'john.doe@post.ar', 'WhVo8r8rw2zBjDVMCwHRqoJlO1U3/AkIlXKl4K4T0l7smLpsUvFkM9MmYM6pWcHBoSn2Fm7E3Ly4whFEcZLY5kv5+qTIwk6IVsVmY9QB5qNAzFyNGTrVW60tkL4BxcKtmXASanW2wCOGD1riSU0uQUl+FYaeXydJ7aMDY6PuaEPQS4zeeqFseJBzp+OCTGfehoTnABc02oruDypcuhkgFccrH0/57HOi8/wOl/8UdHIy0J6rhxe5ZcvYvI3nSsOVQjIlng6OKJleh869jgGVzh6X2hVSncq39+6PYUD5m0kOzw8jLh9dRXd2aKGyrTvoKvv9btC47ytO0xF7I6iryI1g4Zlx2cwtS+l1wcEsYWXkQFxQgAa2p8r5BBLPJrS+WfUgiW3SGMN8j8ocfMkknz1b/J2uxJ78m2I91xdwEqH9QasZRzLxcvJa0f0iGz6ZmkJf44ZYZgy5JdatTCeLxupyYySC8y4eavyn3dwoC7rFiFytXXUWtd6GGZf+clwAKhbqw0uI36Mj7dt9soFB33bZIbvsf15ABROH1cXr9/Xv4zbzJRfo9XDuzzSt1VAkcd+CmjQuBBGcS9BRjwnkDwCoW65hNrvwNorGdGD3QXoke54aT9CX0BSAyBvxH7l5b9XwDbZlfuGMVeOBtl0mtfou7xt5o7L1zeEi83rN/fJL3yjGToBbDvxDbdwJj+9PZtpDZUe+9K0cVBaws1GpfdY5g6eT4BRK7aqJTZITjdz4oFlTqmwwcCB0vuwP+qAa/haAQXarU9z70+4XyWC8c/yPDvDIuf4eOJZPT9LXZwigoFPMr+dmwhoPKHEDOIgZ7sz2TrQkXovO/l4SCBzxMPNnGmIutb8gCSROfpmuBOdeaGTTYz8ll7sREKzL7o6lHPPZCYL0hXSadwouLdESoapjyzNDxb80f9tf6zxjYe+nQhgs+vWuxUtpE0rY6N2eahYAzfV4tlvycuXZsfnNPGxX13y7ftJeI7Wgs9aUw5o6D2ydUMAGWKzhCBdviodNvXf2HKUI2NsRpVC7W0piuXx9YzfWVazLyvPiwPoSpMyJWRfMapxbBeswwyjTsYmLp+dxlXxhXPeXlogCtZlm1GKaRQRZGS3J5AHz4h7APC4sITJrAXcd4GQWz5hffccY8ByaoInx1SjXS/T/oSPtsq1q49PNhdFpH0o=', '1594476342037', false, false, 2);
INSERT INTO public.sent (id, "messageId", "to", content, "timestamp", "isStarred", "isDeleted", "userId") VALUES (7, '30b63781-8c3e-4b74-85b9-1f785d1ceb48', 'jane.doe@post.ar', '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', '1594476430058', false, false, 1);
INSERT INTO public.sent (id, "messageId", "to", content, "timestamp", "isStarred", "isDeleted", "userId") VALUES (8, 'abd5c002-df52-4eca-a43b-e07c0179e63f', 'john.doe@post.ar', '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', '1594476475554', false, false, 2);
INSERT INTO public.sent (id, "messageId", "to", content, "timestamp", "isStarred", "isDeleted", "userId") VALUES (9, '1f7e5688-a2ae-4dda-9891-80cb61e39fc4', 'jane.doe@post.ar', 'WhVo8r8rw2zBjDVMCwHRqoJlO1U3/AkIlnGh56pA1llokDkqplzCMIvUgMX98yqMjXv4h3owCE5c/l6LIlOqmZnUauEWxNCku6gPpE/wXjuqAmqFZPmj6jtrsMjyHXpNIQoyZq6Iw9VqtDhQGoIeM6gX8mleXg0OeItkcvmJLtBoVM1TkVp8jCHUkoiEdXw8FGQBIKg+F1nULvlIeChPA8zbRmwV94dXSe0m/D4SZYHfT2UTE+FS53AkJKBKmdqdVRXLCxQRBxreiplCLcaVJ4h9kGe31VLy6dlByNFwWlLI+q3WSC+RhwJHM8y7GIV0T6CaPRLwM0ahJXu/pF7Evc1U7FWQRwLzCWJ+H1m6X22FTYO3VAyduDwSHt0s0E6PX/rUkJjzPztBSiWo4mEZR/1VF8A9QiJYRTRqQJwdbQPZ8vXGJFp4v1uzMcVbVb50MUC/nOFWZnf5E3MdqoCa+2yfhkNqA6pZVaNyACLLdejd4oYkbULe+yGHqPaHm0PEx4NTr+xZygyKDL1S7TsR7qAxKANCFu12RAINIpq+MXLNmaP+0dcyy5YnVFcGy1PjLIQJSwT6rxBOcADIEU0zuaAWuSvxKDWZBAcQJEV1zxHEfxoZn6y5S8raC+xw4HsZGN1oyVLjVeunXVH/2QsFhG/kKkvgZcv8rJUjsr7CSCSARHha9kjzM1nXeyqrerqTCEtiFmpVpwoRTXPDkp36kYRft5g3pYvLaO8TWVjEo+I/12R0lQz2J+NdiedfrnMw3CvYqXi/ykDP71SAv0gpRka6e9VGwIOdKcUUJwEDCJ2JbsoIZdZoIjYxAFfOKbu9qcDXUn/nHddv/y87DfsaCSWvXX+gbceQy6tf7HrWs9vS9KxoWH3Cp3/bzf1ACGtghe2sLi5NcIFl3hEkb+/5OL7/SKwuIVm0x5wLJILn438ys/QLCsctqKM1EQt0+LBHYQzUQuuK/n1XGaKexj6IjiH+Aa6pi0hpkxgl0JbG0gdmKrjHvamaC0G2pE48Rj7pydIwO/nPp6V3F89mZY8SwMZ+1yPt/8JOr60Ahtq5ZwQ6OXM9btgrGYR1ylj7uV1LYi7Ljw06Kw+QyE9WFfuPs2k25YqE7739QYA/u2YtgL/68icolgeQNQfAomxZbHZrmYjgq9r5/v/QoCMhR3Az65QrRUBL8K2VPcfSIfnpufLpzb655teaR1AHe35pWmvVzGD6xo10biq6IwXg6dYwcbHmDhv9a482ItIlrFvf6MWZQphVZF55ODkBlxBuJspku0pwk7g6fWD4ToqZqrvxK/2Rol6mZh510LIQv1tl9Jf5jJjGPaSDGPmHJHPFnDexsJ0myPyxc4sgK/rvxjWSzkus/LHMRUnqiUqbgdznpV7r+1ppqhSdmRjbh2nIEsh2wD0lUMmHCGCAFjbLJ95EHjm6i3ILZVBRN+PRiDSFFNQdFGnHzGANa7oUDTp9n3QQJ5qu+8zWYSWt265yGuziF0+Os6G28aYWVXdzIxIXs8Ct6+uv+UqkAn2pbKCJVRaIwETSwlYKvP3mlMv7witx0aF8sOp3FpKFfUfiKL/e0kmoFx5RJwb7It9EOevitAcD81NSqFl/F/bIRyTtj6JdaS76o+2XMQQDLWiX5NBXTSEROJD0+ceS9usIA3AzOHu94J3n1/+yVNUoFyHCir1G4RaHAS3XRsFF0hZ4UTDCJVM4lbH3IDtfNqrXU4qm+iA1kkrvrpF/Nexe8OydIetaKlAuxJVtnhMV2GM09ee+', '1594476615546', false, false, 3);


--
-- TOC entry 2956 (class 0 OID 16495)
-- Dependencies: 209
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."user" (id, username, password, name, surname, theme, "keepMeLoggedIn") VALUES (1, 'john.doe@post.ar', '$2b$10$FJ2OJqrv6.fHzPNyb.nQTexvHNvTiy95.uYtUQc.oAdhKfK/dlstu', 'John', 'Doe', 'default', false);
INSERT INTO public."user" (id, username, password, name, surname, theme, "keepMeLoggedIn") VALUES (2, 'jane.doe@post.ar', '$2b$10$rqHtYVAHor0LVqWMG/uyNOXFs9E3tp3J6wk7kfQDYZqo40kiJq4rC', 'Jane', 'Doe', 'dark', false);
INSERT INTO public."user" (id, username, password, name, surname, theme, "keepMeLoggedIn") VALUES (3, 'lorem.ipsum@post.ar', '$2b$10$SQx81a1ZrLbngvKMPVE7LOEAjktnJvmlw1sKxnt3IcEVKb3e/I6hi', 'Lorem', 'Ipsum', 'default', false);


--
-- TOC entry 2966 (class 0 OID 0)
-- Dependencies: 206
-- Name: drafts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.drafts_id_seq', 4, true);


--
-- TOC entry 2967 (class 0 OID 0)
-- Dependencies: 202
-- Name: inbox_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inbox_id_seq', 9, true);


--
-- TOC entry 2968 (class 0 OID 0)
-- Dependencies: 204
-- Name: sent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sent_id_seq', 9, true);


--
-- TOC entry 2969 (class 0 OID 0)
-- Dependencies: 208
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 3, true);


--
-- TOC entry 2813 (class 2606 OID 16490)
-- Name: drafts PK_0598e229012c6cbd4ccbba97328; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.drafts
    ADD CONSTRAINT "PK_0598e229012c6cbd4ccbba97328" PRIMARY KEY (id);


--
-- TOC entry 2809 (class 2606 OID 16477)
-- Name: sent PK_6cde306cca817d92f4a06efac1f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sent
    ADD CONSTRAINT "PK_6cde306cca817d92f4a06efac1f" PRIMARY KEY (id);


--
-- TOC entry 2805 (class 2606 OID 16464)
-- Name: inbox PK_ab7abc299fab4bb4f965549c819; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inbox
    ADD CONSTRAINT "PK_ab7abc299fab4bb4f965549c819" PRIMARY KEY (id);


--
-- TOC entry 2817 (class 2606 OID 16504)
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- TOC entry 2807 (class 2606 OID 16466)
-- Name: inbox UQ_2c0eec31fc30e7e7cc7aa5d946e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inbox
    ADD CONSTRAINT "UQ_2c0eec31fc30e7e7cc7aa5d946e" UNIQUE ("messageId");


--
-- TOC entry 2815 (class 2606 OID 16492)
-- Name: drafts UQ_5aa23aa2868ca505923aade1ac4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.drafts
    ADD CONSTRAINT "UQ_5aa23aa2868ca505923aade1ac4" UNIQUE ("messageId");


--
-- TOC entry 2819 (class 2606 OID 16506)
-- Name: user UQ_78a916df40e02a9deb1c4b75edb; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE (username);


--
-- TOC entry 2811 (class 2606 OID 16479)
-- Name: sent UQ_98acc3836397b89ed389947b1c9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sent
    ADD CONSTRAINT "UQ_98acc3836397b89ed389947b1c9" UNIQUE ("messageId");


--
-- TOC entry 2820 (class 2606 OID 16507)
-- Name: inbox FK_1d56ca8c3c27225986941f032cc; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inbox
    ADD CONSTRAINT "FK_1d56ca8c3c27225986941f032cc" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- TOC entry 2822 (class 2606 OID 16517)
-- Name: drafts FK_6b4e9f2a1131fc1e9c5ba6ceaeb; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.drafts
    ADD CONSTRAINT "FK_6b4e9f2a1131fc1e9c5ba6ceaeb" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- TOC entry 2821 (class 2606 OID 16512)
-- Name: sent FK_6ce8b16cdc92b132421a1789f84; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sent
    ADD CONSTRAINT "FK_6ce8b16cdc92b132421a1789f84" FOREIGN KEY ("userId") REFERENCES public."user"(id);


-- Completed on 2020-07-11 14:14:03 UTC

--
-- PostgreSQL database dump complete
--

