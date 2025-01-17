import React, { useState } from 'react';

const CampaignExportLink = (props) => {
    const [type, setType] = useState("preselection")
    const campaignId = window.location.pathname.split('/').pop();

    return (
        <div style={{ width: "100%", marginBottom: 10 }}>
            <div style={{ fontSize: 12, color: "#4945FF", fontWeight: 600 }}>Exporter les candidatures</div>
            <div style={{ width: "100%", display: "flex", gap: 4 }}>
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    style={{
                        padding: "3px 10px",
                        borderRadius: 4,
                        border: "1px solid #4945FF",
                    }}
                >
                    <option value="preselection">Pré-sélectionnées</option>
                    <option value="all">Toutes</option>
                </select>
                <a
                    href={`/strapi/campaigns/${campaignId}/redirect-to-export${type === "all" ? "?all=true" : ""}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        padding: "3px 10px",
                        color: "white",
                        borderRadius: 4,
                        backgroundColor: "#4945FF",
                        border: "1px solid #4945FF",
                        textDecoration: "none",
                        display: "inline-block"
                    }}
                >
                    Exporter
                </a>
            </div>
            <div style={{ marginTop: 4, color: "grey", lineHeight: "14px" }}>
                <small>
                    Attention : pensez à vous connecter sur StudioD avec votre compte admin avant de lancer l'export.
                </small>
            </div>
            <hr style={{ marginBottom: 10 }} />
        </div >
    );
};

export default CampaignExportLink;
