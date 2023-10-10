import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
  Image,
  Canvas
} from "@react-pdf/renderer";
import poppins from "./assets/poppins.ttf";
import logo from "./assets/location.png";
import line from "./assets/Line.png";
import comp from "./assets/Realassistai.png";
import { useStore } from "./store";

function PDFRenderer() {
  const apiData = useStore((state) => state.data);
  const image = useStore((state) => state.image);

  Font.register({
    family: "Poppins",
    src: poppins,
  });

  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#ffffff",
      height: "85%",
      width: "100%",
    },
    ninepx: {
      fontFamily: "Poppins",
      fontSize: "9px",
      fontStyle: "normal",
      fontWeight: "900",
    },
    headerFont: {
      color: "#090E24",
      paddingBottom: "10px",
    },
    footerFontLeft: {
      color: "#1463FF",
      paddingTop: "10px",
    },
    footerFontRight: {
      color: "#090E24",
      paddingTop: "10px",
    },
    header: {
      position: "absolute",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      borderBottom: "2px solid #9ac0fc",
      margin: "16px",
      top: "0px",
      width: "95%",
    },
    footer: {
      position: "absolute",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      borderTop: "2px solid #9ac0fc",
      margin: "16px",
      bottom: "0px",
      width: "95%",
    },
    main: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingTop: "50px",
      paddingLeft: "15px",
      paddingRight: "15px",
    },
    subHeading: {
      fontFamily: "Poppins",
      fontSize: "10px",
      fontStyle: "normal",
      fontWeight: "900",
      color: "#090E24",
    },
    accordion: {
      display: "flex",
      flexDirection: "column",
      paddingTop: "10px",
      paddingLeft: "15px",
      paddingRight: "15px",
    },
  });

  return (
    <div className="row mt-3">
      {typeof apiData === "object" && (
        <div className="col-12">
          <PDFViewer style={{ width: "100%", height: "650px" }}>
            <Document title={apiData.title}>
              <Page size="A4" style={styles.page} wrap>
                <View style={styles.header} fixed>
                  <Image src={comp} style={{ height: "16px", width: "92px" }} />
                  <Text style={[styles.headerFont, styles.ninepx]}>
                    123 Main Street, Dover, NH 03820-4667
                  </Text>
                </View>
                <View style={styles.main}>
                  <Image src={logo} style={{ height: "10px", width: "10px" }} />
                  <Text style={styles.subHeading}>&nbsp;Crime</Text>
                  <Image
                    src={line}
                    style={{ height: "2px", width: "100%", marginLeft: "10px" }}
                  />
                </View>
                <View style={styles.accordion}>
                  <Text
                    style={[
                      styles.ninepx,
                      {
                        paddingLeft: "10px",
                        backgroundColor: "#E8EEFB",
                        height: "24px",
                        paddingTop: "8px",
                        borderTopLeftRadius: "12px",
                        borderTopRightRadius: "12px",
                      },
                    ]}
                  >
                    Burglary
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: "#F2F4F5",
                    height: "175px",
                    borderBottomLeftRadius: "12px",
                    borderBottomRightRadius: "12px",
                    marginLeft: "15px",
                    marginRight: "15px",
                  }}
                >
                  <Image src = {image} style = {{width : "520px", height: "155px", margin: "auto"}} />
                </View>
                <View style={styles.footer} fixed>
                  <Text style={[styles.footerFontLeft, styles.ninepx]}>
                    Report Generated on October 11, 2023
                  </Text>
                  <Text style={[styles.footerFontRight, styles.ninepx]}>
                    RealAssistPropertyReport|Page 1 of 1{" "}
                  </Text>
                </View>
              </Page>
            </Document>
          </PDFViewer>
        </div>
      )}
    </div>
  );
}

export default PDFRenderer;
