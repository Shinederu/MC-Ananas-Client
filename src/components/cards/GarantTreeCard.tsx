import { AuthContext } from "@/shared/context/AuthContext";
import { ModalContext } from "@/shared/context/ModalContext";
import { useHttpClient } from "@/shared/hooks/http-hook";
import { useInterval } from "@/shared/hooks/useInterval";
import { MinecraftUserType } from "@/types/User";
import { useContext, useEffect, useRef, useState } from "react";
import Tree from "react-d3-tree";

interface PlayerNode {
    name: string;
    attributes?: {
        username: string;
    };
    children?: PlayerNode[];
}

const MinecraftGarantTreeCard = () => {
    const { sendRequest } = useHttpClient();
    const modalCtx = useContext(ModalContext);
    const authCtx = useContext(AuthContext);

    const [treeData, setTreeData] = useState<PlayerNode | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const [accountsList, setAccountList] = useState<MinecraftUserType[]>([]);

    const sendGetMinecraftsAccountList = async () => {
        await sendRequest({
            key: 101,
            url: import.meta.env.VITE_PLAY_API_URL + "/management/minecraft",
            method: "GET",
            headers: { Authorization: authCtx.token },
            onSuccess: (data) => {
                setAccountList(data.minecrafts);
            },
            onError: (error) => {
                modalCtx.open(error, "error");
            },
        });
    };

    const buildTree = (accounts: MinecraftUserType[]): PlayerNode => {
        const idToNode = new Map<number, PlayerNode>();
        const roots: PlayerNode[] = [];

        for (const account of accounts) {
            if (account.verifyBy) {
                idToNode.set(account.id, {
                    name: account.pseudo,
                    attributes: {
                        username: account.user.username,
                    },
                    children: [],
                });
            }
        }

        for (const account of accounts) {
            if (account.verifyBy) {
                const node = idToNode.get(account.id)!;
                const garant = account.garant;
                if (garant && idToNode.has(garant.id)) {
                    idToNode.get(garant.id)!.children!.push(node);
                } else {
                    roots.push(node);
                }
            }
        }

        return {
            name: "Garants principaux",
            children: roots,
        };
    };

    const renderCustomNode = ({ nodeDatum }: any) => {
        return (
            <g>
                <foreignObject x={-70} y={-50} width={140} height={100}>
                    <div
                        style={{
                            backgroundColor: "#1f2937",
                            border: "2px solid #10b981",
                            borderRadius: "12px",
                            padding: "8px",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <img
                            src={`https://mc-heads.net/avatar/${nodeDatum.name}/40`}
                            alt={nodeDatum.name}
                            style={{
                                borderRadius: "50%",
                                marginBottom: "6px",
                            }}
                        />
                        <span style={{ fontSize: "14px", fontWeight: "bold", color: "white" }}>
                            {nodeDatum.name}
                        </span>
                        <span style={{ fontSize: "11px", color: "#d1d5db" }}>
                            @{nodeDatum.attributes?.username}
                        </span>
                    </div>
                </foreignObject>
            </g>
        );
    };

    const launchControl = async () => {
        await sendGetMinecraftsAccountList();
        const tree = buildTree(accountsList);
        setTreeData(tree);
    };

    useEffect(() => {
        if (containerRef.current) {
            const { width } = containerRef.current.getBoundingClientRect();
            setTranslate({ x: width / 2, y: 60 });
        }
    }, []);

    useInterval(() => {
        launchControl();
    }, 5000);

    return (
        <div className="bg-gradient-to-br from-blue-600 to-cyan-300 p-6 rounded-2xl shadow-lg text-white w-full">
            <h1 className="text-3xl font-bold text-center mb-6">Arbre des garants</h1>
            <div ref={containerRef} style={{ width: "100%", height: "600px" }}>
                {treeData ? (
                    <Tree
                        data={treeData}
                        orientation="vertical"
                        translate={translate}
                        collapsible
                        zoomable
                        separation={{ siblings: 1.5, nonSiblings: 2 }}
                        renderCustomNodeElement={renderCustomNode}
                    />
                ) : (
                    <p className="text-center text-lg">Aucune donnée à afficher.</p>
                )}
            </div>
        </div>
    );
};

export default MinecraftGarantTreeCard;
