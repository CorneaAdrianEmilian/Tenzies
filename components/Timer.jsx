export default function Timer(props)
{
return(
<div>
  {"Timer: "} {props.minutes < 10 ? "0": ""}{props.minutes} {":"} {props.seconds < 10 ? "0": ""}{props.seconds}
</div>
)


}