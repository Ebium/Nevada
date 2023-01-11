import styled from "styled-components/macro"
import { ReactComponent as PlaySVG } from "../../assets/play.svg"
import { ReactComponent as NewsSVG } from "../../assets/news.svg"
import { ReactComponent as RankSVG } from "../../assets/ranking.svg"
import { ReactComponent as GamesWinSVG } from "../../assets/games_win.svg"
import { ReactComponent as GamesLostSVG } from "../../assets/games_lost.svg"
import { ReactComponent as StatsSVG } from "../../assets/games_stats.svg"
import { ReactComponent as WinSerieSVG } from "../../assets/win_serie.svg"

import { colors } from "./design.config"

export const StyledPlaySVG = styled(PlaySVG)`
  & path {
    fill: ${colors.white};
  }
`
export const StyledNewsSVG = styled(NewsSVG)`
  & path {
    fill: ${colors.white};
  }
`
export const StyledRankSVG = styled(RankSVG)`
  & path {
    fill: ${colors.white};
  }
`
export const StyledGamesWinSVG = styled(GamesWinSVG)`
  & path {
    fill: ${colors.green};
  }
`
export const StyledGamesLostSVG = styled(GamesLostSVG)`
  & path {
    fill: ${colors.red};
  }
`
export const StyledWinSerieSVG = styled(WinSerieSVG)`
  & path {
    fill: ${colors.blue};
  }
`
export const StyledStatsSVG = styled(StatsSVG)`
  & path {
    fill: ${colors.white};
  }
`