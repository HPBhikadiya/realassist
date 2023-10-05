import React, { FC, useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { toPng } from "html-to-image";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  headerMainDiv: {
    width: "563px",
    height: "24px",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  headerLeftDiv: {
    width: "10%",
    height: "24px",
    flexShrink: 0,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  headerLeftDivImg: {
    height: "18px",
    flexShrink: 0,
  },
  headerLeftDivText: {
    flexShrink: 0,
    textAlign: "left",
    lineHeight: 1.2,
    fontSize: 10,
  },
  headerRightDiv: {
    width: "83%",
    height: "2px",
    flexShrink: 0,
    backgroundColor: "#005DFF",
  },
  headerText: {
    fontSize: 10,
    color: "#000000",
    lineHeight: 1.2,
    fontFamily: "Arial",
  },
  middleDiv: {
    width: "100%",
    height: "300px",
    flexShrink: 0,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    borderRadius: 10,
    backgroundColor: "#fff",
    marginTop: 10,
  },
  firstSectionMiddleDiv: {
    width: "100%",
    height: "24px",
    flexShrink: 0,
    display: "flex",
    justifyContent: "center",

    fontSize: 10,
    color: "#1463FF",
    backgroundColor: "#E8EEFB",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingLeft: 10,
  },
  secondSectionMiddleDiv: {
    height: "300px",
    flexShrink: 0,
    paddingTop: 20,
    paddingBottom: 30,
    paddingRight: 30,
    backgroundColor: "#F2F4F5",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  chartDiv: {
    backgroundColor: "#fff",
    flexShrink: 0,
    borderRadius: 10,
    paddingTop: 30,
    paddingBottom: 30,
    paddingRight: 20,
  },
  chartText: {
    transform: "rotate(-90deg)",
    fontSize: "9px",
  },

  footerRightDiv: {
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    height: "2px",
    flexShrink: 0,
    backgroundColor: "#005DFF",
  },
  footer: {
    width: "100%",
    flexShrink: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    fontSize: "9px",
    color: "#1463FF",
  },
});

interface props {}

const MyDocument: FC<props> = () => {
  const [chartImage, setChartImage] = useState<string | null>(null);

  useEffect(() => {
    const chartElement = document.getElementsByClassName("recharts-surface")[0];
    if (chartElement) {
      //@ts-ignore
      toPng(chartElement)
        .then((dataUrl) => {
          setChartImage(dataUrl);
        })
        .catch((error) => {
          console.error("Error converting chart to image:", error);
        });
    }
  }, []);

  return (
    <>
      <Document>
        <Page
          size={{
            width: 563,
            height: 400,
          }}
          style={styles.page}
        >
          <View style={styles.section}>
            <View style={styles.headerMainDiv}>
              <View style={styles.headerLeftDiv}>
                <Image
                  src="./location-share.png"
                  style={styles.headerLeftDivImg}
                />
                <Text style={styles.headerLeftDivText}> Crime</Text>
              </View>
              <View style={styles.headerRightDiv} />
            </View>

            <View style={styles.middleDiv}>
              <View style={styles.firstSectionMiddleDiv}>
                <Text>Burglary</Text>
              </View>
              <View style={styles.secondSectionMiddleDiv}>
                <Text style={styles.chartText}>Burglary</Text>
                <View style={styles.chartDiv}>
                  {chartImage && <Image src={chartImage} />}
                </View>
              </View>
            </View>
            <View style={styles.footerRightDiv} />
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Report Genereted on September 26, 2023
              </Text>
              <Text style={styles.footerText}>
                RealAssist Property Report | Page 1 of 25
              </Text>
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
};

export default MyDocument;
