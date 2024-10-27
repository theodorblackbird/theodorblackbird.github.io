--- 
layout: article
title: Lina-Speech demo page
date: 2024-10-22
category: "demo" 
---
<section>
<h2> Authors </h2>
Théodor Lemerle - IRCAM<br>
Harrison Vanderbyl - RWKV Foundation/Eleuther AI/Recursal AI<br>
Vaibhav Srivastav - HuggingFace<br>
Nicolas Obin - IRCAM <br>
Axel Roebel - IRCAM <br>

</section>

<section>
<h2> Initial State Tuning</h2>
<p style="">
Initial State Tuning eases voice cloning from <strong> multiple speech excerpts </strong>, allowing us to capture finer details of the target speaker's identity. We compare this approach to prompt continuation. All speakers in this section are <strong>unseen</strong>. We crop the target text of VoiceCraft when necessary due to its limited context window.
</p>
<table>
    <tr>
    <th>Speaker</th>
    <th>Text</th>
    <th style="min-width:160px;">Original</th>
    <th style="min-width:160px;">Lina-Speech <small>(Initial State Tuning)</small></th>
    <th style="min-width:160px;">Lina-Speech <small>(Prompt continuation)</small></th>
    <th style="min-width:160px;">VoiceCraft <small>(Prompt continuation)</small></th>
    </tr>
{% for row in ist_manifest %}
    <tr style="border-bottom: 1px solid #000;">
        <td>{{ row.speaker }}  </td>
        <td>  {{ row.text_target }}</td>
        <td><audio controls=""><source src="/assets/demo_lina/ist/{{ row.folder }}/norm/original.wav" type="audio/x-wav"></audio></td>
        <td><audio controls=""><source src="/assets/demo_lina/ist/{{ row.folder }}/norm/ist.wav" type="audio/x-wav"></audio></td>
        <td><audio controls=""><source src="/assets/demo_lina/ist/{{ row.folder }}/norm/no_ist.wav" type="audio/x-wav"></audio></td>
        <td><audio controls=""><source src="/assets/demo_lina/ist/{{ row.folder }}/norm/voicecraft.wav" type="audio/x-wav"></audio></td>
    </tr>
{% endfor %}

</table>
</section>
<section>
<h2> Initial State Tuning Against Parler - Expresso Dataset (Evaluation samples) </h2>
<p style="">
Samples from the evaluation in the paper on the Expresso Dataset.
Samples are <strong>unseen</strong> during training for Lina-Speech and the initial states are tuned on each pair (speaker, style). Parler-Mini has been fine-tuned on Expresso.
</p>

<table>
    <tr>
    <th>Speaker ID</th>
    <th>Style</th>
    <th>Text</th>
    <th>Original</th>
    <th style="min-width:160px;">Lina-Speech <small>(Initial State Tuning)</small></th>
    <th style="min-width:160px;">Parler Mini<small>(Textual Prompt)</small></th>
    </tr>
{% for row in expresso_manifest %}
    <tr style="border-bottom: 1px solid #000;">
        <td>{{ row.speaker_id }}  </td>
        <td>{{ row.style }}  </td>
        <td>  {{ row.text_target }}</td>
        <td><audio controls=""><source src="/assets/demo_lina/expresso/{{ row.speaker_id }}_{{ row.style }}_example.wav" type="audio/x-wav"></audio></td>
        <td><audio controls=""><source src="/assets/demo_lina/expresso/{{ row.id }}_lina.wav" type="audio/x-wav"></audio></td>
        <td><audio controls=""><source src="/assets/demo_lina/expresso/{{ row.id }}_parler.wav" type="audio/x-wav"></audio></td>
    </tr>
{% endfor %}
    </tr>
</table>
</section>



<section>
 <h2> Initial State Tuning Against Parler - LibriTTS (Evaluation samples)</h2>
<p style="">
Samples from the evaluation in the paper on LibriTTS.
Samples are <strong>seen</strong> during training for both models.
</p>
<table>
    <tr>
    <th>Speaker ID</th>
    <th>Text</th>
    <th>Original</th>
    <th style="min-width:160px;">Lina-Speech <small>(Initial State Tuning)</small></th>
    <th style="min-width:160px;">Parler Mini<small>(Textual Prompt)</small></th>
    </tr>
{% for row in ltts_gpt_manifest %}
    <tr style="border-bottom: 1px solid #000;">
        <td>{{ row.speaker }}  </td>
        <td>  {{ row.text_target }}</td>
        <td><audio controls=""><source src="/assets/demo_lina/ltts_gpt/{{ row.id }}_example.wav" type="audio/x-wav"></audio></td>
        <td><audio controls=""><source src="/assets/demo_lina/ltts_gpt/{{ row.id }}_lina.wav" type="audio/x-wav"></audio></td>
        <td><audio controls=""><source src="/assets/demo_lina/ltts_gpt/{{ row.id }}_parler.wav" type="audio/x-wav"></audio></td>
    </tr>
{% endfor %}
    </tr>
</table>
</section>

<section>
<h2> Zero-shot voice cloning by prompt continuation (Evaluation samples). </h2>
<p>
Samples from the evaluation in the paper on LibriTTS test split for prompt continuation.
Samples are <strong>unseen</strong> during training.
</p>
<table>
    <tr>
    <th>Speaker ID</th>
    <th>Text</th>
    <th>Prompt</th>
    <th>Lina-Speech </th>
    <th>VoiceCraft</th>
    <th>StyleTTS 2</th>
    <th>VALLE-X (Plachtaa)</th>
    </tr>
{% for row in zero_manifest %}
    <tr style="border-bottom: 1px solid #000;">
        <td>{{ row.speaker_id }}  </td>
        <td>  {{ row.text_target }}</td>
        <td><audio controls=""><source src="/assets/demo_lina/zero/{{ row.id }}_prompt.wav" type="audio/x-wav"></audio></td>
        <td><audio controls=""><source src="/assets/demo_lina/zero/{{ row.id }}_lina.wav" type="audio/x-wav"></audio></td>
        <td><audio controls=""><source src="/assets/demo_lina/zero/{{ row.id }}_voicecraft.wav" type="audio/x-wav"></audio></td>
        <td><audio controls=""><source src="/assets/demo_lina/zero/{{ row.id }}_styletts.wav" type="audio/x-wav"></audio></td>
        <td><audio controls=""><source src="/assets/demo_lina/zero/{{ row.id }}_vallex.wav" type="audio/x-wav"></audio></td>
    </tr>
{% endfor %}
    </tr>
</table>

</section>
