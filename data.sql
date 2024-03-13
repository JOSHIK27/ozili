SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.5 (Ubuntu 15.5-1.pgdg20.04+1)

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
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") FROM stdin;
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."flow_state" ("id", "user_id", "auth_code", "code_challenge_method", "code_challenge", "provider_type", "provider_access_token", "provider_refresh_token", "created_at", "updated_at", "authentication_method") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") FROM stdin;
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") FROM stdin;
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."instances" ("id", "uuid", "raw_base_config", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") FROM stdin;
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") FROM stdin;
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_factors" ("id", "user_id", "friendly_name", "factor_type", "status", "created_at", "updated_at", "secret") FROM stdin;
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_challenges" ("id", "factor_id", "created_at", "verified_at", "ip_address") FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") FROM stdin;
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sso_providers" ("id", "resource_id", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."saml_providers" ("id", "sso_provider_id", "entity_id", "metadata_xml", "metadata_url", "attribute_mapping", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."saml_relay_states" ("id", "sso_provider_id", "request_id", "for_email", "redirect_to", "created_at", "updated_at", "flow_state_id") FROM stdin;
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sso_domains" ("id", "sso_provider_id", "domain", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--

COPY "pgsodium"."key" ("id", "status", "created", "expires", "key_type", "key_id", "key_context", "name", "associated_data", "raw_key", "raw_key_nonce", "parent_key", "comment", "user_data") FROM stdin;
\.


--
-- Data for Name: productComponents; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."productComponents" ("fabric", "subFabric", "productComponent", "productComponentCategory", "type") FROM stdin;
Chiffon	Chiffon 60*60	Chiffon Chunni	Chunni	Meters
Cotton	Cotton Checks	Cotton Checks Long Top	Top	Meters
Cotton	Cotton Checks	Cotton Checks Small Top	Top	Meters
Cotton	Cotton Supernet	Cotton Supernet Long Top	Top	Meters
Cotton	Cotton Supernet	Cotton Supernet Saree	Saree	Meters
Cotton	Mulmul Cotton	Mulmul Chunni	Chunni	Meters
Cotton	Prince	Prince Blouse	Blouse	Meters
Cotton	Prince	Prince Small Top	Top	Meters
Cotton	Prince	Prince Dress Bottom	Bottom	Meters
Shimmer	Shimmer	Shimmer Long Top	Top	Meters
Shimmer	Shimmer	Shimmer Small Top	Top	Meters
Shimmer	Shimmer	Shimmer Saree	Saree	Meters
Kota	Kota Supernet	Supernet Saree	Saree	Pieces
Murshidabad	Murshidabad Pure Silk Plain	Murshidabad Pure Silk Plain Saree	Saree	Pieces
Kota 	Kota 4 Inch Silver	Kota 4 Inch Silver Saree	Saree	Pieces
Kota 	Kota 2 Inch Silver	Kota 2 Inch Silver Saree	Saree	Pieces
Kota 	Kota 1 Inch Silver	Kota 1 Inch Silver Saree	Saree	Pieces
Kota	Kota Plain	Kota Plain Saree	Saree	Pieces
Kota 	Koa 4 Inch Gold	Kota 4 Inch Gold Saree	Saree	Pieces
Kota	Kota 2 Inch Gold	Kota 2 Inch Gold Saree	Saree	Pieces
Kota	Kota 1 Inch Gold	Kota 1 Inch Gold Saree	Saree	Pieces
Cotton	Mulmul Cotton	Mulmul Saree	Saree	Meters
Cotton	Cotton Checks	Cotton Checks Saree	Saree	Meters
Cotton	Cotton Supernet	Cotton Supernet Small Top	Top	Meters
Cotton	Prince	Prince Long Top	Top	Meters
Mangalagiri	Mangalagiri Checks	Mangalagiri Checks Saree	Saree	Pieces
Mangalagiri	Mangalagiri Plain	Mangalagiri Plain	Saree	Pieces
Mangalagiri 	Mangalagiri 55-150	Mangalagiri 55-150	Saree	Pieces
Mangalagiri 	Mangalagiri 50-50	Mangalagiri 50-50	Saree	Pieces
Mangalagiri 	Mangalagiri 55-200	Mangalagiri 55-200	Saree	Pieces
Nellore Khadi	Khadi Silk	Khadi Silk Chunni	Chunni	Meters
Nellore Khadi	Khadi Silk	Khadi Silk Small Top	Top	Meters
Nellore Khadi	Khadi Silk	Khadi Silk Saree	Saree	Meters
Nellore khadi	Khadi Silk Chunni Pre Cut	Khadi Silk Chunni Pre Cut	Chunni	Pieces
Nellore Khadi	Khadi	Khadi Silk Long Top	Top	Meters
\.


--
-- Data for Name: componentstbl; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."componentstbl" ("component", "compcategory", "metersperpiece", "subfabric", "fabric") FROM stdin;
Cotton Checks Long Top	Top	3.5	Cotton Checks	Cotton
Cotton Checks Small Top	Top	2.6	Cotton Checks	Cotton
Cotton Supernet Long Top	Top	3.5	Cotton Supernet	Cotton
Cotton Supernet Saree	Saree	5.85	Cotton Supernet	Cotton
Mulmul Chunni	Chunni	2.5	Mulmul Cotton	Cotton
Prince Blouse	Blouse	1	Prince	Cotton
Prince Small Top	Top	2.6	Prince	Cotton
Prince Dress Bottom	Bottom	2	Prince	Cotton
Shimmer Long Top	Top	3.5	Shimmer	Shimmer
Shimmer Small Top	Top	2.6	Shimmer	Shimmer
Shimmer Saree	Saree	5.85	Shimmer	Shimmer
Murshidabad Pure Silk Plain Saree	Saree	0	Murshidabad Pure Silk Plain	Murshidabad
Kota 4 Inch Silver Saree	Saree	0	Kota 4 Inch Silver	Kota 
Kota 2 Inch Silver Saree	Saree	0	Kota 2 Inch Silver	Kota 
Kota 1 Inch Silver Saree	Saree	0	Kota 1 Inch Silver	Kota 
Kota Plain Saree	Saree	0	Kota Plain	Kota
Kota 4 Inch Gold Saree	Saree	0	Koa 4 Inch Gold	Kota 
Kota 2 Inch Gold Saree	Saree	0	Kota 2 Inch Gold	Kota
Kota 1 Inch Gold Saree	Saree	0	Kota 1 Inch Gold	Kota
Mulmul Saree	Saree	5.85	Mulmul Cotton	Cotton
Cotton Checks Saree	Saree	5.85	Cotton Checks	Cotton
Cotton Supernet Small Top	Top	2.6	Cotton Supernet	Cotton
Prince Long Top	Top	3.5	Prince	Cotton
Mangalagiri Checks Saree	Saree	5.85	Mangalagiri Checks	Mangalagiri
Mangalagiri Plain	Saree	0	Mangalagiri Plain	Mangalagiri
Mangalagiri 55-150	Saree	0	Mangalagiri 55-150	Mangalagiri 
Mangalagiri 50-50	Saree	0	Mangalagiri 50-50	Mangalagiri 
Mangalagiri 55-200	Saree	0	Mangalagiri 55-200	Mangalagiri 
Khadi Silk Chunni	Chunni	2.5	Khadi Silk	Nellore Khadi
Khadi Silk Small Top	Top	2.6	Khadi Silk	Nellore Khadi
Khadi Silk Saree	Saree	5.85	Khadi Silk	Nellore Khadi
Khadi Silk Chunni Pre Cut	Chunni	0	Khadi Silk Chunni Pre Cut	Nellore khadi
Khadi Silk Long Top	Top	3.5	Khadi	Nellore Khadi
\.


--
-- Data for Name: cutstocktbl; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."cutstocktbl" ("id", "created_at", "fabric", "subfabric", "component", "quantitycut", "compquantity", "cutby", "date", "wastage") FROM stdin;
5	2024-01-28 16:57:01.460679+00	Cotton	Mulmul Cotton	Mulmul Saree	24	6	joshik	2024-01-28	0
4	2024-01-28 16:56:36.438285+00	Cotton	Mulmul Cotton	Mulmul Chunni	19	8	joshik	2024-01-21	0
3	2024-01-28 16:36:44.859787+00	Cotton	Cotton Checks	Cotton Checks Long Top	45	13	joshik	2024-01-21	0
6	2024-02-02 13:18:44.354122+00	Cotton	Cotton Checks	Cotton Checks Long Top	20	6	joshik	2024-02-03	0
7	2024-02-02 13:19:59.359922+00	Cotton	Cotton Checks	Cotton Checks Long Top	20	6	joshik	2024-02-02	0
10	2024-02-02 13:34:44.825092+00	Cotton	Cotton Checks	Cotton Checks Long Top	60	18	j	2024-02-02	0
11	2024-02-02 13:43:04.801361+00	Cotton	Cotton Checks	Cotton Checks Long Top	128	37	j	2024-02-03	0
1	2024-01-28 16:14:18.61092+00	Cotton	Prince	Prince Blouse	300	300	joshik	2024-01-28	0
12	2024-02-03 15:22:13.18545+00	Nellore Khadi	Khadi Silk	Khadi Silk Saree	500	86	jo	2024-02-03	0
\.


--
-- Data for Name: dyechargestbl; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."dyechargestbl" ("id", "startdate", "dyetype", "rate", "enddate", "timestamp") FROM stdin;
1	2024-01-01	Shibori	115	2024-03-31	2024-02-02 09:39:35.050246+00
2	2024-01-01	Pathaka	85	2024-03-31	2024-02-02 09:39:35.050246+00
3	2024-01-01	3 Colors	85	2024-03-31	2024-02-02 09:39:35.050246+00
4	2024-01-01	Plain	85	2024-03-31	2024-02-02 09:39:35.050246+00
5	2024-01-01	2 Colors	85	2024-03-31	2024-02-02 09:39:35.050246+00
6	2024-01-01	Shaded	85	2024-03-31	2024-02-02 09:39:35.050246+00
\.


--
-- Data for Name: dyestyletbl; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."dyestyletbl" ("dyestyle") FROM stdin;
style1
style2
style3
\.


--
-- Data for Name: dyetypestbl; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."dyetypestbl" ("dyetype", "dyetbl", "printtbl", "jobworktbl") FROM stdin;
Shaded	t	f	t
Shibori	t	f	f
Pathaka	t	f	f
Plain	t	t	t
Damage	t	f	f
White	f	f	t
3_Colors	t	t	t
2_Colors	t	t	t
\.


--
-- Data for Name: fabrictbl; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."fabrictbl" ("fabric") FROM stdin;
Cotton
Shimmer
Mangalagiri
Murshidabad
Kota
Nellore Khadi
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."products" ("product", "component1", "component2", "component3", "fabric", "productcategory") FROM stdin;
Kota 1 Inch Gold	Kota 1 Inch Gold	Prince Blouse	\N	Kota	saree
Kota 2 Inch Gold	Kota 2 Inch Gold	Prince Blouse	\N	Kota	saree
Kota Plain	Kota Plain	Prince Blouse	\N	Kota	saree
Kota 4 Inch Gold	Kota 4 Inch Gold	Prince Blouse	\N	Kota	saree
Kota 1 Inch Silver	Kota 1 Inch Silver	Prince Blouse	\N	Kota	saree
Kota 2 Inch Silver	Kota 2 Inch Silver	Prince Blouse	\N	Kota	saree
Kota 4 Inch Silver	Kota 4 Inch Silver	Prince Blouse	\N	Kota	saree
Chanderi	Chanderi	\N	\N	Chanderi	saree
Murshidabad Pure Silk Plain	Murshidabad Pure Silk Plain	\N	\N	Murshidabad	saree
Mangalagiri Plain	Mangalagiri Plain	\N	\N	Mangalagiri	saree
Mangalagiri 55-150	Mangalagiri 55-150	\N	\N	Mangalagiri	saree
Mangalagiri 55-200	Mangalagiri 55-200	\N	\N	Mangalagiri	saree
Mangalagiri 50-50	Mangalagiri 50-50	\N	\N	Mangalagiri	saree
Mangalagiri Checks	Mangalagiri Checks 	\N	\N	Mangalagiri	saree
Shimmer Saree-J	Shimmer Saree	Jute Blouse	\N	Shimmer	saree
Shimmer Saree-G	Shimmer Saree	Georgette Blouse	\N	Shimmer	saree
Shimmer Saree-C	Shimmer Saree	Crepe Blouse	\N	Shimmer	saree
Mulmul Saree	Mulmul Saree	Prince Blouse	\N	Cotton	saree
Cotton Checks Long Dress	Cotton Checks Long Top	Chiffon Chunni	\N	Cotton	dress
Cotton Checks Small Dress	Cotton Checks Small Top	Chiffon Top	Prince Dress Bottom	Cotton	dress
Cotton Checks Saree	Cotton Checks Saree	Prince Blouse	\N	Cotton	saree
Cotton Supernet Long Dress	Cotton Supernet Long Top	Chiffon Chunni	\N	Cotton	dress
Cotton Supernet Small Dress	Cotton Supernet Small Top	Prince Dress Bottom	Prince Dress Bottom	Cotton	dress
Cotton Supernet Saree	Cotton Supernet Saree	Prince Blouse	\N	Cotton	saree
Supernet	Supernet	Prince Blouse	\N	Kota	saree
Khadi Silk Saree	Khadi Silk Saree	\N	\N	Nellore Khadi	saree
\.


--
-- Data for Name: suppliertbl; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."suppliertbl" ("supplier", "email", "mobile", "address", "type", "empaneldate", "gstnumber", "address_1") FROM stdin;
Pradyuman	\N	\N	\N	Fabric	\N	\N	\N
Rafiq	\N	\N	\N	Fabric	\N	\N	\N
Saurabh	\N	\N	\N	Fabric	\N	\N	\N
Shiv Shakti	\N	\N	\N	Fabric	\N	\N	\N
Kantha Rao	\N	\N	\N	Fabric	\N	\N	\N
SAFE Express	\N	\N	\N	Logistics	\N	\N	\N
APSRTC	\N	\N	\N	Logistics	\N	\N	\N
Sindhu	\N	\N	\N	Logistics	\N	\N	\N
Navata	\N	\N	\N	Logistics	\N	\N	\N
Kranti	\N	\N	\N	Logistics	\N	\N	\N
DTDC	\N	\N	\N	Logistics	\N	\N	\N
Delhivery	\N	\N	\N	Logistics	\N	\N	\N
ExpressBee	\N	\N	\N	Logistics	\N	\N	\N
BlueDart	\N	\N	\N	Logistics	\N	\N	\N
TSRTC	\N	\N	\N	Logistics	\N	\N	\N
India Post	\N	\N	\N	Logistics	\N	\N	\N
VRL	\N	\N	\N	Logistics	\N	\N	\N
Atayya	\N	\N	\N	Fabric and Jobwork	\N	\N	\N
Susheel	\N	\N	\N	Fabric and Jobwork	\N	\N	\N
Ramesh	\N	\N	\N	Dye and Print	\N	\N	\N
Mallesh	\N	\N	\N	Dye and Print	\N	\N	\N
Sudhakar	\N	\N	\N	Dye and Print	\N	\N	\N
Sankar	\N	\N	\N	Roll	\N	\N	\N
Sridevi	\N	\N	\N	Roll	\N	\N	\N
\.


--
-- Data for Name: dyetbl; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."dyetbl" ("transaction", "date", "primarydyer", "secondarydyer", "fabric", "product", "dyetype", "dyestyle", "quantity", "colorcombination", "id") FROM stdin;
Regular	2024-01-29	Ramesh	Ramesh	Cotton	Kota 4 Inch Gold	Shibori	style3	10	\N	5
Regular	2024-01-29	Ramesh	Ramesh	Kota	Kota 1 Inch Gold	3_Colors	style1	200	\N	3
Regular	2024-01-28	Ramesh	Ramesh	Cotton	Mulmul Saree	2_Colors	style2	5	\N	1
\.


--
-- Data for Name: printtypestbl; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."printtypestbl" ("printtype", "printtbl", "jobworktbl", "rollingtbl") FROM stdin;
Screen Blend	t	t	t
Block Batik	f	t	t
Pen Batik	f	t	t
Acid Block Print	f	t	t
Brush Acid	f	t	t
Hand Paint	f	t	t
Ajrakh	f	t	t
Bagru	f	t	t
Bhandej	f	t	t
Kalamkari	f	t	t
Digital	f	t	t
Dabu	f	t	t
Discharge	f	t	t
Rapid	t	f	t
Pigment	t	f	t
Shibori	f	f	t
Pathaka	f	f	t
Dye Damage	t	f	f
Print Damage	t	t	f
Acid Paint	f	t	t
\.


--
-- Data for Name: jobworktbl; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."jobworktbl" ("date", "supplier", "printtype", "dyetype", "movement", "fabric", "product", "quantity", "timestamp", "id", "rollingrequired", "transaction", "cargoprovider", "cargocharges", "additionalcharges", "cpubt", "cpuat", "gstpaid", "gstrate", "netcost", "payabletosupplier", "totalcost", "targetdate", "cargopaidbysupplier") FROM stdin;
2024-01-12	Atayya	Screen Blend	3_Colors	Out	Kota	Kota 1 Inch Gold	9	\N	10	t	Regular	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
2024-01-12	Atayya	Screen Blend	3_Colors	In	Kota	Kota 1 Inch Gold	5	\N	15	t	Regular	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
2024-02-04	Atayya	Hand Paint	White	Out	Nellore Khadi	Khadi Silk Saree	10	2024-02-03 16:02:12.383068+00	18	f	Regular	Delhivery	0	0	0	0	f	0	0	0	0	2024-02-04	f
2024-02-04	Atayya	Block Batik	3_Colors	In	Kota	Kota 1 Inch Gold	3	2024-02-03 18:26:39.401401+00	19	f	Regular	APSRTC	0	0	0	0	f	0	0	0	0	2024-02-04	f
2024-02-03	Atayya	Pen Batik	White	Out	Nellore Khadi	Khadi Silk Saree	8	2024-02-03 18:28:20.057674+00	20	f	Regular	APSRTC	0	0	0	0	f	0	0	0	0	2024-02-04	f
2024-02-04	Atayya	Block Batik	3_Colors	Out	Kota	Kota 1 Inch Gold	20	2024-02-03 18:29:47.607644+00	21	f	Regular	India Post	0	0	0	0	f	0	0	0	0	2024-02-04	f
2024-02-04	Atayya	Screen Blend	White	Out	Nellore Khadi	Khadi Silk Saree	10	2024-02-03 18:39:34.515126+00	22	f	Regular	Delhivery	0	0	0	0	f	0	0	0	0	2024-02-04	f
2024-02-04	Atayya	Screen Blend	White	In	Nellore Khadi	Khadi Silk Saree	10	2024-02-03 18:40:56.352625+00	23	f	Regular	India Post	0	0	0	0	f	0	0	0	0	2024-02-04	f
2024-02-04	Atayya	Pen Batik	White	In	Nellore Khadi	Khadi Silk Saree	18	2024-02-03 18:51:00.081013+00	24	f	Regular	ExpressBee	0	0	0	0	f	0	0	0	0	2024-02-04	f
\.


--
-- Data for Name: printtbl; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."printtbl" ("date", "mainprinter", "secprinter", "product", "dyetype", "printtype", "quantity", "timestamp", "rollingrequired", "id", "transaction", "fabric") FROM stdin;
2024-01-13	Ramesh	Ramesh	Kota 1 Inch Gold	3_Colors	Rapid	10	\N	t	1	Regular	Kota
2024-02-02	Ramesh	Ramesh	Kota 1 Inch Gold	3_Colors	Screen Blend	2	2024-02-02 20:40:51.621808+00	f	14	Regular	Kota
2024-02-02	Ramesh	Ramesh	Kota 1 Inch Gold	3_Colors	Rapid	20	2024-02-02 20:33:48.370394+00	t	13	Regular	Kota
\.


--
-- Data for Name: rollingtbl; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."rollingtbl" ("date", "supplier", "rolltype", "movement", "printtype", "fabric", "quantity", "transportcharges", "timestamp", "id", "transaction", "product") FROM stdin;
2024-02-04	Sankar	Machine	In	Rapid	Kota	5	10	\N	6	Regular	Kota 1 Inch Gold
2024-02-04	Sankar	Hand	Out	Rapid	Kota	10	10	\N	2	Regular	Kota 1 Inch Gold
2024-02-04	Sankar	Hand	Out	Rapid	Kota	10	6	\N	7	Regular	Kota 1 Inch Gold
\.


--
-- Data for Name: subfabrictbl; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."subfabrictbl" ("subfabric", "fabric", "units") FROM stdin;
Cotton Checks	Cotton	Meters
Cotton Supernet	Cotton	Meters
Mulmul Cotton	Cotton	Meters
Prince	Cotton	Meters
Shimmer	Shimmer	Meters
Murshidabad Pure Silk Plain	Murshidabad	Pieces
Mangalagiri Plain	Mangalagiri	Pieces
Mangalagiri 50-50	Mangalagiri	Pieces
Mangalagiri 50-150	Mangalagiri	Pieces
Mangalagiri 50-200	Mangalagiri	Pieces
Kota 1 Inch Gold	Kota	Pieces
Kota 2 Inch Gold	Kota	Pieces
Kota 4 Inch Gold	Kota	Pieces
Kota Plain 	Kota	Pieces
Supernet	Kota	Pieces
Chiffon 60*60	Chiffon	Meters
Khadi	Nellore Khadi	Meters
Khadi Silk	Nellore Khadi	Meters
Khadi Silk Chunni Pre Cut	Nellore Khadi	Meters
\.


--
-- Data for Name: whitestocktbl; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."whitestocktbl" ("id", "timestamp", "orderdate", "receiveddate", "invoicenumber", "supplier", "fabric", "subfabric", "units", "quantity", "cargoprovider", "cargocharges", "freeshipping", "gstpaid", "gstrate", "additionalcharges", "cpubt", "cpuat", "netcost", "totalcost", "cargopaidbysupplier", "payabletosupplier") FROM stdin;
18	2024-01-28 15:07:11.164531+00	2024-01-20	2024-01-21	676	Pradyuman	Cotton	Cotton Checks	Meters	23	DTDC	0	t	t	2	20	20	20.4	21.269565217391303	489.2	f	489.2
15	2024-01-28 14:46:40.192733+00	2024-01-25	2024-01-26	54567	Pradyuman	Murshidabad	Murshidabad Pure Silk Plain	Pieces	45	DTDC	0	t	t	44	44	4	5.76	6.737777777777778	303.2	f	303.2
19	2024-01-28 16:56:05.023043+00	2024-01-28	2024-01-28	87	Pradyuman	Cotton	Mulmul Cotton	Meters	50	DTDC\n	0	t	t	2	20	20	20.4	20.799999999999997	1039.9999999999998	f	1039.9999999999998
6	2024-01-28 13:44:32.961286+00	2024-01-13	2024-01-27	34	Pradyuman	Mangalagiri	Mangalagiri Plain	Pieces	30	DTDC	0	t	t	3	30	3	3.09	4.09	122.69999999999999	f	122.69999999999999
1	2024-01-28 13:09:31.052648+00	2024-01-04	2024-01-06	89	Pradyuman	Cotton	Cotton Checks	Meters	99	DTDC	0	t	t	8	90	90	97.2	98.10909090909091	9712.8	f	9712.8
7	2024-01-28 14:21:07.653496+00	2024-01-30	2024-01-31	900	Pradyuman	Cotton	Cotton Checks	Meters	90	DTDC	0	t	t	9	90	9	9.81	10.81	972.9000000000001	f	972.9000000000001
5	2024-01-28 13:37:56.903952+00	2024-01-06	2024-01-07	876	Pradyuman	Cotton	Cotton Checks	Meters	78	DTDC	0	t	t	6	89	78	82.68	83.82102564102564	6538.04	f	6538.04
17	2024-01-28 14:55:23.369748+00	2024-01-19	2024-01-27	222	Pradyuman	Kota	Supernet	Pieces	105	DTDC	0	t	t	2	2	2	2.04	2.062222222222222	185.6	f	185.6
12	2024-01-28 14:26:38.142278+00	2024-01-19	2024-01-20	543	Pradyuman	Cotton	Cotton Checks	Meters	3	DTDC	0	t	t	3	3	3	3.09	4.09	12.27	f	12.27
20	2024-02-02 12:38:14.854407+00	2024-02-10	2024-02-11	2023	Shiv Shakti	Mangalagiri	Mangalagiri Plain	Pieces	20	ExpressBee	0	t	t	2	20	20	20.4	21.4	428	f	428
21	2024-02-02 12:42:48.716998+00	2024-02-17	2024-02-18	2023	Shiv Shakti	Murshidabad	Murshidabad Pure Silk Plain	Pieces	200	Delhivery	0	t	t	20	200	200	240	241	48200	f	48200
16	2024-01-28 14:53:49.603135+00	2024-01-13	2024-01-20	22	Pradyuman	Cotton	Prince	Meters	800	DTDC	0	t	t	2	2	2	2.04	2.049009009009009	454.88	f	454.88
22	2024-02-03 07:57:23.482037+00	2024-02-20	2024-02-20	1234	Kantha Rao	Nellore Khadi	Khadi Silk	Meters	1058	APSRTC	0	t	f	0	0	85	85	85	89930	f	89930
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id") FROM stdin;
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id") FROM stdin;
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--

COPY "vault"."secrets" ("id", "name", "description", "secret", "key_id", "nonce", "created_at", "updated_at") FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: cuttbl_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."cuttbl_id_seq"', 12, true);


--
-- Name: dyechargestbl_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."dyechargestbl_id_seq"', 6, true);


--
-- Name: dyetbl_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."dyetbl_id_seq"', 14, true);


--
-- Name: jobworktbl_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."jobworktbl_id_seq"', 24, true);


--
-- Name: printtbl_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."printtbl_id_seq"', 14, true);


--
-- Name: rollingtbl_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."rollingtbl_id_seq"', 7, true);


--
-- Name: whitestocktbl_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."whitestocktbl_id_seq"', 22, true);


--
-- PostgreSQL database dump complete
--

RESET ALL;
