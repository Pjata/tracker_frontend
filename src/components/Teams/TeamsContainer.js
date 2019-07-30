import React from "react"
import TeamsComponent from "./TeamsComponent"

const TeamsContainer = () => {
  const data = [
    {
      id: "mac",
      name: "MAC Újbuda",
      logo: "https://www.visegradhockey.hu/_upload/editor/visegradkupa/383.png"
    },
    {
      id: "kmh",
      name: "KMH",
      logo:
        "http://kmh.sport.hu/wp-content/themes/kmh/css/images/kmh_budapest.png"
    }
  ]
  return <TeamsComponent teams={data} />
}
export default TeamsContainer
