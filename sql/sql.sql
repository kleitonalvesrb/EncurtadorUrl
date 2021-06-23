
CREATE SEQUENCE encurtador.url_urlid_seq;

CREATE TABLE encurtador.url (
                urlid INTEGER NOT NULL DEFAULT nextval('encurtador.url_urlid_seq'),
                urlencurtada VARCHAR NOT NULL,
                urloriginal VARCHAR NOT NULL,
                urldescricao VARCHAR NOT NULL,
                urldatainc TIMESTAMP DEFAULT now() NOT NULL,
                urlstatus BOOLEAN DEFAULT true NOT NULL,
                CONSTRAINT urlid PRIMARY KEY (urlid)
);
COMMENT ON TABLE encurtador.url IS 'Tabela que irá armazenar os dados de url que serão encurtadas';
COMMENT ON COLUMN encurtador.url.urlid IS 'Chave primária';
COMMENT ON COLUMN encurtador.url.urlencurtada IS 'url ja encurtada';
COMMENT ON COLUMN encurtador.url.urloriginal IS 'url original';
COMMENT ON COLUMN encurtador.url.urldescricao IS 'descrição da url';
COMMENT ON COLUMN encurtador.url.urldatainc IS 'data e hora da inclusão da url';
COMMENT ON COLUMN encurtador.url.urlstatus IS 'campo para controle de exclusão logica';


ALTER SEQUENCE encurtador.url_urlid_seq OWNED BY encurtador.url.urlid;
